import {
  InAppClient,
  ListInput,
  MarkReadInput,
  MintTokenInput,
  InAppNotification,
} from "./inapp.types";

const qs = (params: Record<string, string | undefined>) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v && p.set(k, v));
  return p.toString();
};

export const createInAppClient = (client: InAppClient) => ({
  list: (data: ListInput) =>
    client.get<{ success: boolean; data: InAppNotification[] }>(
      `/notifications/list-notifications?${qs(data)}`,
    ),

  unreadCount: (data: ListInput) =>
    client.get<{ success: boolean; data: { count: number } }>(
      `/notifications/unread-count?${qs(data)}`,
    ),

  markAsRead: ({ id, ...rest }: MarkReadInput) =>
    client.patch<null, { success: boolean; data: InAppNotification }>(
      `/notifications/mark-as-read-sdk/${id}?${qs(rest)}`,
    ),

  delete: ({ id, ...rest }: MarkReadInput) =>
    client.delete<{ success: boolean }>(
      `/notifications/delete-inapp-sdk/${id}?${qs(rest)}`,
    ),

  mintStreamToken: (data: MintTokenInput) =>
    client.post<MintTokenInput, { success: boolean; data: { token: string } }>(
      `/notifications/connect-token`,
      data,
    ),
});
