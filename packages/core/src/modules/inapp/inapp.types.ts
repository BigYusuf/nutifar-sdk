export type InAppNotification = {
  id: string;
  tenantId: string;
  appId?: string | null;
  externalId: string;
  deliveryId: string;
  title?: string | null;
  body?: string | null;
  data?: any;
  readAt?: string | null;
  createdAt: string;
};

export type StreamState =
  | "idle"
  | "connecting"
  | "open"
  | "reconnecting"
  | "error";

export type InAppEventMap = {
  "notification.created": InAppNotification;
  "notification.read": InAppNotification;
};

export interface EventSourceLike {
  onopen: (() => void) | null;
  onerror: ((err: any) => void) | null;
  addEventListener(type: string, listener: (event: any) => void): void;
  close(): void;
}

export interface InAppClient {
  get: <R>(url: string) => Promise<R>;
  post: <T, R>(url: string, data?: T) => Promise<R>;
  patch: <T, R>(url: string, data?: T) => Promise<R>;
  put: <T, R>(url: string, data?: T) => Promise<R>;
  delete: <R>(url: string) => Promise<R>;
}

export type ListInput = { externalId: string; appId?: string };
export type MarkReadInput = { id: string; externalId: string; appId?: string };
export type MintTokenInput = { externalId: string };
