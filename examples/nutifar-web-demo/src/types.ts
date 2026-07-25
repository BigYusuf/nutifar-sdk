export type PermissionState = "default" | "granted" | "denied";

export interface PushDevice {
  id?: string;
  token?: string;
  platform?: string;
  browser?: string;
  registered: boolean;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  receivedAt: string;
  data?: Record<string, any>;
}

export interface SDKEvent {
  id: string;
  level: "info" | "success" | "error";
  message: string;
  timestamp: string;
}
