"use client";

import { useEffect, useMemo } from "react";

import { Nutifar } from "@nutifar/web";

import { useEmailPlaygroundStore } from "../store/email.store";

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

async function runNotificationAction(
  store: ReturnType<typeof useEmailPlaygroundStore.getState>,
  actionLabel: string,
  successMessage: string,
  failureMessage: string,
  action: () => Promise<unknown>,
) {
  try {
    store.setLoading(true);

    store.addEvent(createEvent(actionLabel));

    const response = await action();

    store.setResponse(response);

    store.addEvent(createEvent(successMessage, "success"));
  } catch (error) {
    console.error(error);

    store.setResponse(error);

    store.addEvent(createEvent(failureMessage, "error"));
  } finally {
    store.setLoading(false);
  }
}

export function useEmailPlayground() {
  const store = useEmailPlaygroundStore();

  /**
   * Create SDK once
   */
  const sdk = useMemo(
    () =>
      Nutifar({
        // apiKey: process.env.NEXT_PUBLIC_NUTIFAR_API_KEY_DEV!,
        apiKey: process.env.NEXT_PUBLIC_NUTIFAR_API_KEY!,
      }),
    [],
  );

  /**
   * Initialize SDK
   */
  useEffect(() => {
    async function initialize() {
      try {
        store.addEvent(createEvent("Initializing SDK"));

        await sdk.initialize();

        store.setInitialized(true);

        store.addEvent(createEvent("SDK initialized", "success"));
      } catch (error) {
        console.error(error);

        store.addEvent(createEvent("SDK initialization failed", "error"));
      }
    }

    initialize();
  }, [sdk]);

  /**
   * Send email
   */
  async function sendEmail(to: string, subject: string, html: string) {
    return runNotificationAction(
      store,
      "Calling sdk.notification.sendEmail()",
      "Email queued successfully",
      "Email sending failed",
      () => sdk.notification.sendEmail({ to, subject, html }),
    );
  }

  /**
   * Send SMS
   */
  async function sendSMS(to: string, body: string) {
    return runNotificationAction(
      store,
      "Calling sdk.notification.sendSMS()",
      "SMS queued successfully",
      "SMS sending failed",
      () => sdk.notification.sendSMS({ to, body }),
    );
  }

  /**
   * Send web push
   */
  async function sendWebPush(to: string, title: string, body: string) {
    return runNotificationAction(
      store,
      "Calling sdk.notification.sendPush()",
      "Web push queued successfully",
      "Web push sending failed",
      () => sdk.notification.sendPush({ to, title, body }),
    );
  }

  /**
   * Send in-app notification
   */
  async function sendInApp(to: string, title: string, body: string) {
    return runNotificationAction(
      store,
      "Calling sdk.notification.sendInApp()",
      "In-app notification queued successfully",
      "In-app notification sending failed",
      () => sdk.notification.sendInApp({ to, title, body }),
    );
  }

  return {
    initialized: store.initialized,

    loading: store.loading,

    response: store.response,

    events: store.events,

    sendEmail,
    sendSMS,
    sendWebPush,
    sendInApp,
  };
}
