// modules/event/event.service.ts
import {
  NotificationClient,
  NotificationResponse,
  CreateNotificationInput,
  Recipient,
} from "./event.types";
import {
  SendEmailInput,
  SendSMSInput,
  SendPushInput,
  SendInAppInput,
  EmailAddressInput,
} from "./event.public.types";

// ---- adapters (private to this file, not exported) ----
function toRecipient(
  input: EmailAddressInput,
  role: "to" | "cc" | "bcc",
): Recipient {
  const base =
    typeof input === "string"
      ? { email: input }
      : { email: input.email, name: input.name };
  return { ...base, metadata: { role } };
}

function toRecipientList(
  input: EmailAddressInput | EmailAddressInput[] | undefined,
  role: "to" | "cc" | "bcc",
): Recipient[] {
  if (!input) return [];
  return (Array.isArray(input) ? input : [input]).map((i) =>
    toRecipient(i, role),
  );
}

function toEmailAddress(input: EmailAddressInput) {
  return typeof input === "string" ? { email: input } : input;
}

function toWireEmailRequest(input: SendEmailInput): CreateNotificationInput {
  return {
    type: input.type ?? (input.template ? "template" : "custom"),
    source: "API",
    templateId: null,
    templateName: input.template?.name ?? null,
    payload: {
      subject: input.subject,
      body: input.html ?? input.text,
      attachments: input.attachments,
      ...input.template?.data,
    },
    metadata: {
      channel: "EMAIL",
      ...(input.from ? { from: toEmailAddress(input.from) } : {}),
      ...input.metadata,
    },
    recipients: [
      ...toRecipientList(input.to, "to"),
      ...toRecipientList(input.cc, "cc"),
      ...toRecipientList(input.bcc, "bcc"),
    ],
  } as CreateNotificationInput; // tenantId attached server-side
}

function toWireSmsRequest(input: SendSMSInput): CreateNotificationInput {
  const numbers = Array.isArray(input.to) ? input.to : [input.to];
  return {
    type: input.type ?? (input.template ? "template" : "custom"),
    source: "API",
    templateId: null,
    templateName: input.template?.name ?? null,
    payload: { body: input.body, ...input.template?.data },
    metadata: { channel: "SMS", ...input.metadata },
    recipients: numbers.map((phone) => ({ phone })),
  } as CreateNotificationInput;
}

function toWirePushRequest(input: SendPushInput): CreateNotificationInput {
  const tokens = Array.isArray(input.to) ? input.to : [input.to];
  return {
    type: input.type ?? (input.template ? "template" : "custom"),
    source: "API",
    templateId: null,
    templateName: input.template?.name ?? null,
    payload: { title: input.title, body: input.body, ...input.template?.data },
    metadata: { channel: "PUSH", ...input.metadata },
    recipients: tokens.map((nutifarToken) => ({ nutifarToken })),
  } as CreateNotificationInput;
}

function toWireInAppRequest(input: SendInAppInput): CreateNotificationInput {
  const ids = Array.isArray(input.to) ? input.to : [input.to];
  return {
    type: input.type ?? (input.template ? "template" : "custom"),
    source: "API",
    templateId: null,
    templateName: input.template?.name ?? null,
    payload: { title: input.title, body: input.body, ...input.template?.data },
    metadata: { channel: "INAPP", ...input.metadata },
    recipients: ids.map((externalId) => ({ externalId })),
  } as CreateNotificationInput;
}

// ---- public module factory (this is what create.sdk.ts wires up) ----
export const createNotificationModule = (client: NotificationClient) => ({
  sendEmail: (data: SendEmailInput) =>
    client.post<unknown, NotificationResponse>(
      "/events/send-email",
      toWireEmailRequest(data),
    ),

  sendSMS: (data: SendSMSInput) =>
    client.post<unknown, NotificationResponse>(
      "/events/send-sms",
      toWireSmsRequest(data),
    ),

  sendPush: (data: SendPushInput) =>
    client.post<unknown, NotificationResponse>(
      "/events/send-push",
      toWirePushRequest(data),
    ),

  sendInApp: (data: SendInAppInput) =>
    client.post<unknown, NotificationResponse>(
      "/events/send-inapp",
      toWireInAppRequest(data),
    ),
});
