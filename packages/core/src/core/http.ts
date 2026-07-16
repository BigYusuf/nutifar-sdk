import { parseError } from "./errors";
import { runInterceptors } from "./interceptors";
import { Logger } from "./logger";

export interface RequestConfig {
  url: string;
  method?: string;
  body?: unknown;
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

export const createHttp = (
  transport: TransportOptions = {},
  logger: Logger,
) => {
  const customFetch = transport.fetch ?? fetch;

  return async (config: RequestConfig) => {
    const finalConfig = await runInterceptors(
      transport.interceptors?.request,
      config,
    );

    const requestInit: RequestInit = {
      method: finalConfig.method ?? "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(transport.baseHeaders ?? {}),
        ...(finalConfig.headers ?? {}),
      },
      credentials: finalConfig.credentials ?? transport.credentials,
    };

    if (finalConfig.body !== undefined) {
      requestInit.body = JSON.stringify(finalConfig.body);
    }

    logger.debug("🚀 HTTP REQUEST", {
      url: finalConfig.url,
      method: requestInit.method,
      body: finalConfig.body,
      serializedBody: requestInit.body,
    });

    const res = await customFetch(finalConfig.url, requestInit);

    if (!res.ok) {
      let error = await parseError(res);
      logger?.error("HTTP ERROR", { status: res.status, error });

      if (transport.interceptors?.error) {
        error = await runInterceptors(transport.interceptors.error, error);
      }

      throw error;
    }

    let data = await res.json().catch(() => null);

    if (transport.interceptors?.response) {
      data = await runInterceptors(transport.interceptors.response, data);
    }

    logger?.debug("HTTP RESPONSE", { url: finalConfig.url, data });
    return data;
  };
};
