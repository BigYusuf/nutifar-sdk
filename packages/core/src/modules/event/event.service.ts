import {
  NotificationClient,
  NotificationResponse,
  SendEmailRequest,
  SendInAppRequest,
  SendPushRequest,
  SendSMSRequest,
} from "./event.types";

export const createNotificationModule = (client: NotificationClient) => ({
  // =========================
  // PUSH
  // =========================
  sendPush: (data: SendPushRequest) =>
    client.post<SendPushRequest, NotificationResponse>("/events/send-push", {
      ...data,
      // channel: "PUSH",
    }),

  // =========================
  // EMAIL
  // =========================
  sendEmail: (data: SendEmailRequest) =>
    client.post<SendEmailRequest, NotificationResponse>(
      "/events/send-email",
      {
        ...data,
        // channel: "EMAIL",
      },
    ),

  // =========================
  // SMS
  // =========================
  sendSMS: (data: SendSMSRequest) =>
    client.post<SendSMSRequest, NotificationResponse>("/events/send-sms", {
      ...data,
      // channel: "SMS",
    }),

  // =========================
  // INAPP
  // =========================
  sendInApp: (data: SendInAppRequest) =>
    client.post<SendInAppRequest, NotificationResponse>(
      "/events/send-inapp",
      {
        ...data,
        // channel: "INAPP",
      },
    ),
});
