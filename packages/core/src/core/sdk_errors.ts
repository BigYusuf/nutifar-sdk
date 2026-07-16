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

  constructor(message: string, statusCode = 500, errorCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends NutifarError {
  constructor(message = "Validation Error") {
    super(message, 400, ErrorCode.VALIDATION_ERROR);
  }
}

export class UnauthorizedError extends NutifarError {
  constructor(message = "Unauthorized - Invalid API Key") {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}

export class UploadError extends NutifarError {
  constructor(message = "Upload failed") {
    super(message, 500, ErrorCode.UPLOAD_FAILED);
  }
}

export class NetworkError extends NutifarError {
  constructor(message = "Network request failed") {
    super(message, 503, ErrorCode.NETWORK_ERROR);
  }
}

export class InvalidFileError extends NutifarError {
  constructor(message = "Invalid file input") {
    super(message, 400, ErrorCode.INVALID_FILE);
  }
}
