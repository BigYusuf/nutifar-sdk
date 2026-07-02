export type NotificationRecipient = {
  externalId?: string;
  email?: string;
  phone?: string;
  nutifarToken?: string;
  name?: string;
  metadata?: Record<string, any>;
};

export type BaseNotificationRequest = {
  appId: string;

  type?: string;
  templateId?: string;
  templateName?: string;

  source?: "SYSTEM" | "INTERNAL" | "API" | "CAMPAIGN";

  payload?: Record<string, any>;
  metadata?: Record<string, any>;

  recipients: NotificationRecipient[];
};

export type SendPushRequest = BaseNotificationRequest & {
  title?: string;
  body?: string;
};

export type SendEmailRequest = BaseNotificationRequest & {
  subject?: string;
};

export type SendSMSRequest = BaseNotificationRequest & {};

export type SendInAppRequest = BaseNotificationRequest & {};

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
