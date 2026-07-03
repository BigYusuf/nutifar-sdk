// modules/event/event.types.ts
// INTERNAL WIRE TYPES — mirrors the backend service/controller contract exactly.
// Never export these from index.ts or event.public.types.ts.

export type Recipient = {
  externalId?: string;
  email?: string;
  phone?: string;
  nutifarToken?: string;
  name?: string;
  // role ("to" | "cc" | "bcc") lives here since there's no dedicated column —
  // set by adapters, read by the email worker when building MIME headers.
  metadata?: Record<string, any>;
};

export type NotificationSource = "API" | "CAMPAIGN";

export type CreateNotificationInput = {
  type: string; // required server-side ("tenantId and type are required")
  source?: NotificationSource; 

  templateId?: string | null;
  templateName?: string | null;

  payload?: Record<string, any>;
  // metadata.channel drives resolveSenderIdentityService's default-sender lookup
  // (must be exactly "EMAIL" | "SMS" | "PUSH" | "INAPP").
  // metadata.from / metadata.fromEmail / metadata.fromName are read for sender resolution.
  metadata?: Record<string, any>;

  recipients: Recipient[];
};

// Per-channel wire aliases — same shape today, kept distinct in case
// backend validation ever diverges per endpoint.
export type SendEmailRequest = CreateNotificationInput;
export type SendSMSRequest = CreateNotificationInput;
export type SendPushRequest = CreateNotificationInput;
export type SendInAppRequest = CreateNotificationInput;

export type NotificationResponse = {
  success: boolean;
  message?: string;
  data: {
    success: boolean;
    eventId: string;
  };
};

export interface NotificationClient {
  post: <T, R>(url: string, data?: T) => Promise<R>;
}
