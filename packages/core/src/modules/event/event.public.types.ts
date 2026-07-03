// modules/event/event.public.types.ts
export type EmailAddressInput = string | { email: string; name?: string };

export type EmailAttachment = {
  filename: string;
  content?: string;
  url?: string;
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
  type?: string;
  template?: { name: string; data?: Record<string, any> };
  metadata?: Record<string, any>;
};

export type SendSMSInput = {
  to: string | string[];
  body: string;
  type?: string;
  template?: { name: string; data?: Record<string, any> };
  metadata?: Record<string, any>;
};

export type SendPushInput = {
  to: string | string[]; // nutifarToken(s) or externalId(s) — decide which
  title?: string;
  body?: string;
  type?: string;
  template?: { name: string; data?: Record<string, any> };
  metadata?: Record<string, any>;
};

export type SendInAppInput = {
  to: string | string[];
  title?: string;
  body?: string;
  type?: string;
  template?: { name: string; data?: Record<string, any> };
  metadata?: Record<string, any>;
};

// safe to expose as-is, already generic
export type { NotificationResponse } from "./event.types";
