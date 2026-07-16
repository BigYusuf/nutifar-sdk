export interface GenericResponse {
  message: string;
}
export interface Device {
  id: string;

  tenantId: string;
  appId: string;

  nutifarTokenId: string;

  provider: "FCM" | "APNS" | "WEBPUSH" | "EXPO";
  platform: "IOS" | "ANDROID" | "WEB" | "UNKNOWN";

  pushToken: string;

  fingerprint?: string;

  status: "ACTIVE" | "INVALID" | "EXPIRED";

  failureCount: number;

  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterDeviceRequest {
  pushToken: string;
  platform: string;
  provider: string;
  fingerprint?: string;
  metadata?: Record<string, any>;
}

export interface UnregisterDeviceRequest {
  pushToken: string;
}

export interface RefreshTokenRequest {
  oldToken: string;
  newToken: string;
}

export interface HeartbeatRequest {
  pushToken: string;
}

// export interface SendPushRequest {
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
