const errorStatus = {
  BAD_REQUEST: {
    code: 400,
    type: "BAD_REQUEST",
    detail: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    type: "UNAUTHORIZED",
    detail: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    type: "FORBIDDEN",
    detail: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    type: "NOT_FOUND",
    detail: "Not Found",
  },
  CONFLICT: {
    code: 409,
    type: "CONFLICT",
    detail: "Conflict",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    type: "INTERNAL_SERVER_ERROR",
    detail: "Internal Server Error",
  },
};

export default errorStatus;
