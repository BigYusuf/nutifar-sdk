import { NotificationChannel } from "../../types/schedule.types";


export type ScheduleTarget = {
  externalId?: string;
  email?: string;
  phone?: string;
  nutifarToken?: string;
  name?: string;
};

export type ScheduleTemplates = Partial<
  Record<NotificationChannel, string>
>;

export type ScheduleReminder = {
  offset: string;

  templates: ScheduleTemplates;

  metadata?: Record<string, unknown>;
};

export type ScheduleInput = {
  referenceId: string;

  referenceType?: string;

  referenceDate: Date | string;

  externalId?: string;

  target: ScheduleTarget;

  channels: NotificationChannel[];

  payload?: Record<string, unknown>;

  metadata?: Record<string, unknown>;

  reminders: ScheduleReminder[];
};

export type ScheduleResponse = {
  id: string;

  status:
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELLED"
    | "PAUSED";

  referenceId: string;

  referenceType: string | null;

  referenceDate: string;

  externalId: string | null;

  scheduledCount: number;

  createdAt: string;

  updatedAt: string;
};

export type ScheduledNotification = {
  id: string;

  offset: string;

  scheduledAt: string;

  status:
    | "SCHEDULED"
    | "PROCESSING"
    | "TRIGGERED"
    | "CANCELLED"
    | "FAILED";

  templateIds?: Partial<
    Record<NotificationChannel, string>
  >;

  triggeredAt?: string | null;

  cancelledAt?: string | null;

  failedAt?: string | null;

  metadata?: Record<string, unknown> | null;

  createdAt: string;

  updatedAt: string;
};

export type ScheduleDetailsResponse =
  ScheduleResponse & {
    schedules: ScheduledNotification[];
  };