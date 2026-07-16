import { createHttp } from "./http";
import { createLogger } from "./logger";

type HttpOptions = {
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
};

type ClientOptions = {
  baseURL?: string;
  transport?: any;
  debug?: boolean;
};

export const createClient = ({
  baseURL = "http://localhost:6500/api/v1",
  transport = {},
  debug = false,
}: ClientOptions = {}) => {
  const logger = createLogger({ debug: debug });
  const http = createHttp(transport, logger);

  const request = (url: string) =>
    `${baseURL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  return {
    get: <TResponse>(url: string, options: HttpOptions = {}) =>
      http({
        url: request(url),
        method: "GET",
        ...options,
      }) as Promise<TResponse>,

    post: <TRequest, TResponse>(
      url: string,
      body: TRequest,
      options: HttpOptions = {},
    ) =>
      http({
        url: request(url),
        method: "POST",
        body,
        ...options,
      }) as Promise<TResponse>,

    put: <TRequest, TResponse>(
      url: string,
      body: TRequest,
      options: HttpOptions = {},
    ) =>
      http({
        url: request(url),
        method: "PUT",
        body,
        ...options,
      }) as Promise<TResponse>,

    delete: <TResponse>(url: string, options: HttpOptions = {}) =>
      http({
        url: request(url),
        method: "DELETE",
        ...options,
      }) as Promise<TResponse>,
  };
};
