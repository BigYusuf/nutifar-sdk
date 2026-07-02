export interface GenericResponse {
  message: string;
}
export interface Device {
  id: string;

  tenantId: string;
  appId: string;

  nutifarTokenId: string;

  provider: "FCM" | "APNS" | "WEBPUSH";
  platform: "IOS" | "ANDROID" | "WEB";

  pushToken: string;

  fingerprint?: string;

  status: "ACTIVE" | "INVALID" | "EXPIRED";

  failureCount: number;

  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterDeviceRequest {
  appId: string;
  pushToken: string;
  platform: string;
  provider: string;
  fingerprint?: string;
  metadata?: Record<string, any>;
}

export interface UnregisterDeviceRequest {
  appId: string;
  pushToken: string;
}

export interface RefreshTokenRequest {
  appId: string;
  oldToken: string;
  newToken: string;
}

export interface HeartbeatRequest {
  appId: string;
  pushToken: string;
}

// export interface SendPushRequest {
//   appId: string;
//   title: string;
//   body: string;
//   data?: Record<string, any>;
//   tokens?: string[];
// }

export interface ListDevicesResponse {
  data: Device[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DeviceClient {
  get: <T>(url: string, config?: any) => Promise<T>;
  post: <T, R>(url: string, data?: T) => Promise<R>;
  put: <T, R>(url: string, data?: T) => Promise<R>;
  delete: <R>(url: string) => Promise<R>;
}