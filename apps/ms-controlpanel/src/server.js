import path from "path";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

import "lib-config-app";
import connectDb from "lib-config-db";
import {
  handleParsingError,
  handleMongooseError,
  handleError,
} from "lib-utils-webserver/middlewares/handleError";

import cacheControl from "lib-utils-webserver/middlewares/cacheControl";
import helmetContentSecurity from "lib-utils-webserver/middlewares/helmetContentSecurity";
import validateJWTToken from "lib-utils-webserver/middlewares/validateJWTToken";
import { authorizeAdmin } from "lib-utils-webserver/middlewares/authorize";

import userRoute from "./routes/userRoute.js";
import adminUserRoute from "./routes/adminUserRoute.js";
import microserviceRoute from "./routes/microserviceRoute.js";

const port = 8000;
const serviceName = "CONTROL_PANEL";
const apiBasePath = "/e-commerce";
const __dirname = import.meta.dirname;

connectDb();

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(helmet());
app.use(helmetContentSecurity);
app.use(express.json());
app.use(mongoSanitize());
app.use(apiBasePath, apiLimiter);
app.use(cacheControl({ apiBasePath }));
app.use(cookieParser());
app.use(
  "/",
  express.static(path.join(__dirname, "..", "..", "ui-controlpanel", "dist"))
);

app.use(`${apiBasePath}/user`, userRoute);
app.use(
  `${apiBasePath}/adminuser`,
  validateJWTToken,
  authorizeAdmin,
  adminUserRoute
);
app.use(
  `${apiBasePath}/microservice`,
  validateJWTToken,
  authorizeAdmin,
  microserviceRoute
);

app.use(handleParsingError);
app.use(handleMongooseError);
app.use(handleError);

app.listen(port, () =>
  console.log(`Service [${serviceName}] running on port ${port}`)
);
