import { createHttp } from "./http";

export const createClient = ({
  baseURL = "https://localhost:6500/api/v1/",
  transport = {},
}: {
  baseURL: string;
  transport?: any;
}) => {
  const http = createHttp(transport);

  const request = (url: string) => baseURL + url;

  return {
    get: (url: string, options: any = {}) =>
      http({ url: request(url), method: "GET", ...options }),

    post: (url: string, body: any, options: any = {}) =>
      http({
        url: request(url),
        method: "POST",
        body,
        ...options,
      }),

    put: (url: string, body: any, options: any = {}) =>
      http({
        url: request(url),
        method: "PUT",
        body,
        ...options,
      }),

    delete: (url: string, options: any = {}) =>
      http({
        url: request(url),
        method: "DELETE",
        ...options,
      }),
  };
};
