export class SDKError extends Error {
  status?: number;
  code?: string;
  data?: any;

  constructor({
    message,
    status,
    code,
    data,
  }: {
    message: string;
    status?: number;
    code?: string;
    data?: any;
  }) {
    super(message);
    this.name = "SDKError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

export const parseError = async (res: Response) => {
  let data: any = null;

  try {
    data = await res.json();
  } catch {}

  return new SDKError({
    message: data?.message || "Request failed",
    status: res.status,
    code: data?.code,
    data,
  });
};
