import httpStatusMessages from "./httpStatusMessage.js";

class HttpError extends Error {
    constructor({status = 500, message, data} = {}) {
        message = message || httpStatusMessages[status];
        super(message);
        this.status = status;
        this.data = data;
    }
}

export default HttpError
