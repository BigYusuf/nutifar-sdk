// public.types.ts
export type EmailAddressInput = string | { email: string; name?: string };

export type EmailAttachment = {
  filename: string;
  content?: string;     // base64, small files only
  url?: string;         // preferred for anything non-trivial
  contentType?: string;
  disposition?: "attachment" | "inline";
  contentId?: string;
};

export type SendEmailInput = {
  to: EmailAddressInput | EmailAddressInput[];
  cc?: EmailAddressInput | EmailAddressInput[];
  bcc?: EmailAddressInput | EmailAddressInput[];
  from?: EmailAddressInput;
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];

  type?: string; // e.g. "otp", "invoice" — falls back to "tenant" server-side if omitted
  template?: { name: string; data?: Record<string, any> };

  metadata?: Record<string, any>; // free-form passthrough, merged in but won't clobber role/channel
};

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

export type StreamState = "idle" | "connecting" | "open" | "reconnecting" | "error";

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