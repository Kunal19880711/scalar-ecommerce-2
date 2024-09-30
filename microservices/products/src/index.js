import { connectToDb } from "./mongoconnect.js";
import { startWebServer } from "./webserver.js";

init();

async function init() {
  try {
    await connectToDb();
    console.log("MongoDB connected");
    await startWebServer();
    console.log("Webserver started");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
