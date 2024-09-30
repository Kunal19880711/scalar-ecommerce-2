import express from "express";
import dotenv from "dotenv";
import { ProductsController } from "./controller/index.js";


export const app = express();
app.use(express.json());

new ProductsController(app).init();


export function startWebServer() {
  dotenv.config();
  const host = process.env.SERVER_HOST;
  const port = parseInt(process.env.SERVER_PORT, 10);

  return new Promise((resolve, reject) => {
    app
      .listen(port, host, () => {
        console.log(`Products webserver is running on ${host}:${port}`);
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
