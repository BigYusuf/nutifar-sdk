import { RequestConfig } from "./http";

export type RequestInterceptor = (
  config: RequestConfig,
) => Promise<RequestConfig> | RequestConfig;

export type ResponseInterceptor = (response: any) => Promise<any> | any;

export type ErrorInterceptor = (error: any) => Promise<any> | any;

export interface Interceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
  error?: ErrorInterceptor[];
}
export const runInterceptors = async <T>(
  stack: ((arg: T) => Promise<T> | T)[] = [],
  value: T,
): Promise<T> => {
  let result = value;

  for (const fn of stack) {
    result = await fn(result);
  }

  return result;
};
