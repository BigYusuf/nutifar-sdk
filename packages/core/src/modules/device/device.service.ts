import {
  Device,
  DeviceClient,
  GenericResponse,
  HeartbeatRequest,
  RefreshTokenRequest,
  RegisterDeviceRequest,
  UnregisterDeviceRequest,
} from "./device.types";

export const createDeviceModule = (client: DeviceClient) => ({
  // =========================
  // Register Device
  // =========================
  register: (data: RegisterDeviceRequest) => {
    console.log("🔎 device module register received:", data);
    return client.post<unknown, any>("/devices/register-device", data);
  },
  // =========================
  // Unregister Device
  // =========================
  unregister: (data: UnregisterDeviceRequest) =>
    client.post<UnregisterDeviceRequest, GenericResponse>(
      "/devices/unregister-device",
      data,
    ),

  // =========================
  // Refresh Token
  // =========================
  refreshToken: (data: RefreshTokenRequest) =>
    client.post<RefreshTokenRequest, GenericResponse>(
      "/devices/refresh-push-token",
      data,
    ),

  // =========================
  // Heartbeat
  // =========================
  heartbeat: (data: HeartbeatRequest) =>
    client.post<HeartbeatRequest, GenericResponse>(
      "/devices/push-heart-beat",
      data,
    ),

  // =========================
  // Get Push Token
  // =========================
  getPushToken: (id: string) =>
    client.get<{ token: string }>(`/devices/get-push-token/${id}`),

  // =========================
  // Get Token Details
  // =========================
  getTokenDetails: (id: string) =>
    client.get<Device>(`/devices/get-token-details/${id}`),

  // =========================
  // Revoke Device
  // =========================
  revoke: (data: { deviceId: string }) =>
    client.post<{ deviceId: string }, GenericResponse>(
      "/devices/revoke-device",
      data,
    ),

  // =========================
  // Reactivate Device
  // =========================
  reactivate: (data: { deviceId: string }) =>
    client.post<{ deviceId: string }, GenericResponse>(
      "/devices/reactivate-push",
      data,
    ),
});
