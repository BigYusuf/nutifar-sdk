"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import { usePlaygroundStore } from "../store/playground.store";

import { PushNotification } from "../types";

// import your SDK
// adjust this based on your actual package export
import { Nutifar } from "@nutifar/web";

const sdk = Nutifar({
  apiKey: process.env.NEXT_PUBLIC_NUTIFAR_API_KEY!,
});
function createEvent(
  message: string,
  level: "info" | "success" | "error" = "info",
) {
  return {
    id: crypto.randomUUID(),
    message,
    level,
    timestamp: new Date().toLocaleTimeString(),
  };
}

export function usePushPlayground() {
  const store = usePlaygroundStore();

  /**
   * Initialize SDK
   */
  useEffect(() => {
    async function initialize() {
      try {
        store.addEvent(createEvent("Initializing SDK"));

        await sdk.initialize();

        // keep browser registration up to date
        const result = await sdk.push.syncDevice();

        if (result?.token) {
          store.setDevice({
            id: result.token,
            token: result.token,
            platform: "WEB",
            browser: navigator.userAgent,
            registered: true,
          });
        }

        store.setInitialized(true);
        store.addEvent(createEvent("SDK initialized", "success"));

        store.setPermission(sdk.push.getPermissionStatus() as any);
      } catch (error) {
        console.error(error);
        store.addEvent(createEvent("SDK initialization failed", "error"));
      }
    }

    initialize();
  }, []);

  /**
   * Request browser notification permission
   */
  async function requestPermission() {
    try {
      store.setLoadingPermission(true);
      store.addEvent(createEvent("Requesting permission"));

      await sdk.push.requestPermission();

      const permission = sdk.push.getPermissionStatus();

      store.setPermission(permission as any);

      store.addEvent(createEvent(`Permission: ${permission}`, "success"));
    } catch (e) {
      console.error(e);
      store.addEvent(createEvent("Permission denied", "error"));
    } finally {
      store.setLoadingPermission(false);
    }
  }

  /**
   * Register device
   */
  async function registerDevice() {
    try {
      store.setLoadingRegister(true);
      store.addEvent(createEvent("Registering device"));

      const result = await sdk.push.register();
      store.setDevice({
        id:
          result.response?.data?.nutifarToken ?? result.response?.nutifarToken,
        token: result.response?.data?.nutifarToken,
        platform: "WEB",
        browser: navigator.userAgent,
        registered: true,
      });

      store.setResponse(result);

      store.addEvent(createEvent("Device registered", "success"));
    } catch (e) {
      console.error(e);

      store.addEvent(createEvent("Registration failed", "error"));
    } finally {
      store.setLoadingRegister(false);
    }
  }

  /**
   * Send push
   */
  async function sendPush(title: string, body: string, data: string) {
    try {
      store.setLoadingSend(true);

      store.addEvent(createEvent("Sending notification"));

      const response = await sdk.notification.sendPush({
        to: store.device?.token,
        title,
        body,
        data: data.trim() ? JSON.parse(data) : {},
      });
      store.setResponse(response);

      store.addEvent(createEvent("Push queued", "success"));
    } catch (e) {
      console.error(e);

      store.addEvent(createEvent("Push failed", "error"));
    } finally {
      store.setLoadingSend(false);
    }
  }

  /**
   * Listen for incoming push
   *
   * This will become:
   *
   * nutifar.push.onMessage()
   *
   */
  useEffect(() => {
    const unsubscribe = sdk.push.listen((payload: any) => {
      toast.success(payload?.notification?.title || "Push received");
      store.addNotification({
        id: crypto.randomUUID(),
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data,
        receivedAt: new Date().toLocaleTimeString(),
      });

      store.addEvent(
        createEvent(
          payload.type === "response"
            ? "Notification clicked"
            : "Notification received",
          "success",
        ),
      );
    });

    return unsubscribe;
  }, []);

  return {
    initialized: store.initialized,
    permission: store.permission,
    device: store.device,
    notifications: store.notifications,
    events: store.events,
    response: store.response,
    loadingPermission: store.loadingPermission,
    loadingRegister: store.loadingRegister,
    loadingSend: store.loadingSend,
    requestPermission,
    registerDevice,
    sendPush,
  };
}
