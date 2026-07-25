import { create } from "zustand";

import {
  PermissionState,
  PushDevice,
  PushNotification,
  SDKEvent,
} from "../types";

interface PlaygroundState {
  initialized: boolean;

  permission: PermissionState;

  loadingPermission: boolean;
  loadingRegister: boolean;
  loadingSend: boolean;

  device?: PushDevice;

  notifications: PushNotification[];

  events: SDKEvent[];

  response?: unknown;

  setInitialized(initialized: boolean): void;

  setPermission(permission: PermissionState): void;

  setDevice(device: PushDevice): void;

  setResponse(response: unknown): void;

  addNotification(notification: PushNotification): void;

  addEvent(event: SDKEvent): void;

  setLoadingPermission(v: boolean): void;

  setLoadingRegister(v: boolean): void;

  setLoadingSend(v: boolean): void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  initialized: false,
  permission: "default",
  loadingPermission: false,
  loadingRegister: false,
  loadingSend: false,
  notifications: [],
  events: [],
  setInitialized: (initialized) => set({ initialized }),
  setPermission: (permission) => set({ permission }),
  setDevice: (device) => set({ device }),
  setResponse: (response) => set({ response }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),
  setLoadingPermission: (loadingPermission) => set({ loadingPermission }),
  setLoadingRegister: (loadingRegister) => set({ loadingRegister }),
  setLoadingSend: (loadingSend) => set({ loadingSend }),
}));
