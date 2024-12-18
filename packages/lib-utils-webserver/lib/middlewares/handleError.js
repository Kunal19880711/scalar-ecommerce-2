import mongoose from "mongoose";
import HttpError from "lib-error/HttpError";
import errorStatus from "lib-error/errorStatus";

export function handleParsingError(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return next(
      new HttpError(errorStatus.BAD_REQUEST, "Invalid JSON payload", {
        message: err.message,
      })
    );
  }
  next(err);
}

export function handleMongooseError(err, req, res, next) {
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.CastError
  ) {
    const data = Object.keys(err.errors).map((key) => ({
      keyPath: key,
      value: err.errors[key].message,
    }));
    return next(
      new HttpError(errorStatus.BAD_REQUEST, "Validation Error", data)
    );
  }

  if (err instanceof mongoose.MongooseError) {
    console.error("Unknown mongoose error, need additional handling", err);
    return next(new HttpError(errorStatus.INTERNAL_SERVER_ERROR));
  }

  next(err);
}

export function handleError(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status.code).json({
      success: false,
      status: err.status,
      message: err.message,
      data: err.data,
    });
  }

  // throwing internal server error
  const internalErrStatus = errorStatus.INTERNAL_SERVER_ERROR;
  console.error(internalErrStatus, err);
  res.status(internalErrStatus.code).json({
    success: false,
    status: internalErrStatus,
    message: internalErrStatus.detail,
  });
}
