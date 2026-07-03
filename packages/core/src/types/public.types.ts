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
  appId: string;
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