import errorStatus from "./errorStatus.js";

class GrpcError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || errorStatus.INTERNAL_SERVER_ERROR;
  }
}

export function sendError(callback, err) {
  const status = err.status || errorStatus.INTERNAL_SERVER_ERROR;
  callback(null, {
    success: false,
    message: err.message,
    error: {
      status: err.status || errorStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    },
  });
}

export default GrpcError;
