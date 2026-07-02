import { parseError } from "./errors";
import { runInterceptors } from "./interceptors";

export interface RequestConfig {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export interface TransportOptions {
  fetch?: typeof fetch;
  baseHeaders?: Record<string, string>;
  credentials?: RequestCredentials;
  interceptors?: {
    request?: any[];
    response?: any[];
    error?: any[];
  };
}

export const createHttp = (transport: TransportOptions = {}) => {
  const customFetch = transport.fetch || fetch;

  return async (config: RequestConfig) => {
    const finalConfig = await runInterceptors(
      transport.interceptors?.request,
      config,
    );

    const res = await customFetch(finalConfig.url, {
      method: finalConfig.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(transport.baseHeaders || {}),
        ...(finalConfig.headers || {}),
      },
      body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
      credentials: finalConfig.credentials || transport.credentials,
    });

    if (!res.ok) {
      let error = await parseError(res);

      if (transport.interceptors?.error) {
        error = await runInterceptors(transport.interceptors.error, error);
      }

      throw error;
    }

    let data = await res.json().catch(() => null);

    if (transport.interceptors?.response) {
      data = await runInterceptors(transport.interceptors.response, data);
    }

    return data;
  };
};
