import {
  NotificationClient,
} from "../event/event.types";

import {
  CreateScheduleInput,
  CreateScheduleResponse,
  GetScheduleResponse,
} from "./schedule.public.types";

// ---- public module factory (this is what create.sdk.ts wires up) ----

export const createScheduleModule = (
  client: NotificationClient,
) => ({
  create: (data: CreateScheduleInput) =>
    client.post<
      CreateScheduleInput,
      CreateScheduleResponse
    >("/schedules/create-schedule", data),

  get: (id: string) =>
    client.get<GetScheduleResponse>(
      `/schedules/get-schedules/${id}`,
    ),

  cancel: (id: string) =>
    client.post<
      undefined,
      CreateScheduleResponse
    >(`/schedules/cancel-schedule/${id}`, undefined),

  pause: (id: string) =>
    client.post<
      undefined,
      CreateScheduleResponse
    >(`/schedules/pause-schedule/${id}`, undefined),

  resume: (id: string) =>
    client.post<
      undefined,
      CreateScheduleResponse
    >(`/schedules/resume-schedule/${id}`, undefined),
});