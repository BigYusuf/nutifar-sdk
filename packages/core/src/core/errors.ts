export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  UPLOAD_FAILED = "UPLOAD_FAILED",
  REQUEST_FAILED = "REQUEST_FAILED",
  INVALID_FILE = "INVALID_FILE",
  NETWORK_ERROR = "NETWORK_ERROR",
}

export class NutifarError extends Error {
  public statusCode: number;
  public errorCode: ErrorCode;
  public data?: any;

  constructor(
    message: string,
    statusCode = 500,
    errorCode: ErrorCode = ErrorCode.REQUEST_FAILED,
    data?: any,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends NutifarError {
  constructor(message = "Validation Error", data?: any) {
    super(message, 400, ErrorCode.VALIDATION_ERROR, data);
  }
}

export class UnauthorizedError extends NutifarError {
  constructor(message = "Unauthorized - Invalid API Key", data?: any) {
    super(message, 401, ErrorCode.UNAUTHORIZED, data);
  }
}

export class UploadError extends NutifarError {
  constructor(message = "Upload failed", data?: any) {
    super(message, 500, ErrorCode.UPLOAD_FAILED, data);
  }
}

export class NetworkError extends NutifarError {
  constructor(message = "Network request failed", data?: any) {
    super(message, 503, ErrorCode.NETWORK_ERROR, data);
  }
}

export class InvalidFileError extends NutifarError {
  constructor(message = "Invalid file input", data?: any) {
    super(message, 400, ErrorCode.INVALID_FILE, data);
  }
}

export const parseError = async (res: Response) => {
  let data: any = null;

  try {
    data = await res.json();
  } catch {}

  switch (data?.code) {
    case ErrorCode.VALIDATION_ERROR:
      return new ValidationError(data?.message, data);

    case ErrorCode.UNAUTHORIZED:
      return new UnauthorizedError(data?.message, data);

    case ErrorCode.UPLOAD_FAILED:
      return new UploadError(data?.message, data);

    case ErrorCode.NETWORK_ERROR:
      return new NetworkError(data?.message, data);

    case ErrorCode.INVALID_FILE:
      return new InvalidFileError(data?.message, data);

    default:
      return new NutifarError(
        data?.message || "Request failed",
        res.status,
        ErrorCode.REQUEST_FAILED,
        data,
      );
  }
};
