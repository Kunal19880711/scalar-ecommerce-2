import errorStatus from "./errorStatus.js";

class HttpError extends Error {
  constructor(status = errorStatus.INTERNAL_SERVER_ERROR, message, data) {
    message = message || httpStatusMessages[status];
    super(message);
    this.status = status;
    this.data = data;
  }
}

export default HttpError;
