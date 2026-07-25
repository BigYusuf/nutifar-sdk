// modules/event/event.service.ts
import { NotificationClient, NotificationResponse } from "./event.types";
import {
  SendEmailInput,
  SendSMSInput,
  SendPushInput,
  SendInAppInput,
} from "./event.public.types";

// ---- public module factory (this is what create.sdk.ts wires up) ----
export const createNotificationModule = (client: NotificationClient) => ({
  sendEmail: (data: SendEmailInput) =>
    client.post<SendEmailInput, NotificationResponse>("/events/send-email", data),

  sendSMS: (data: SendSMSInput) =>
    client.post<SendSMSInput, NotificationResponse>("/events/send-sms", data),

  sendPush: (data: SendPushInput) =>
    client.post<SendPushInput, NotificationResponse>("/events/send-push", data),

  sendInApp: (data: SendInAppInput) =>
    client.post<SendInAppInput, NotificationResponse>("/events/send-inapp", data),
});
