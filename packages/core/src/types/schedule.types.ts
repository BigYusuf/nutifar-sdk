export type NotificationChannel="EMAIL"| "SMS"|"IN_APP"|"PUSH" 

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
  /**
   * Examples:
   * -3months
   * -1month
   * -14days
   * -7days
   * -1day
   * +1day
   * +7days
   */
  offset: string;

  templates: ScheduleTemplates;

  metadata?: Record<string, unknown>;
};

export type CreateScheduleGroupInput = {
  /**
   * ID of the business object this schedule belongs to.
   *
   * Example:
   * rent.id
   */
  referenceId: string;

  /**
   * Example:
   * "rent"
   * "invoice"
   * "subscription"
   */
  referenceType?: string;

  /**
   * Date all offsets are calculated from.
   */
  referenceDate: Date | string;

  /**
   * Customer-controlled idempotency key.
   *
   * Example:
   * "rent:rent_123"
   */
  externalId?: string;

  target: ScheduleTarget;

  channels: NotificationChannel[];

  payload?: Record<string, unknown>;

  metadata?: Record<string, unknown>;

  reminders: ScheduleReminder[];
};

export type ScheduleGroup = {
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

export type ScheduleGroupDetails =
  ScheduleGroup & {
    schedules: ScheduledNotification[];
  };