import mongoose from "mongoose";
import HttpError from "../HttpError.js";
import httpStatusMessage from "../httpStatusMessage.js";

export function handleParsingError(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return next(
      new HttpError(400, "Invalid JSON payload", { message: err.message })
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
    return next(new HttpError(400, "Validation Error", data));
  }

  if (err instanceof mongoose.MongooseError) {
    console.error("Unknown mongoose error, need additional handling", err);
    return next(new HttpError(500));
  }

  next(err);
}

export function handleError(err, req, res, next) {
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message, data: err.data });
  }
  console.error(httpStatusMessage[500], err);
  res.status(500).json({ success: false, message: httpStatusMessage[500] });
}

