import fs from "fs";
import path from "path";
import { URL } from "url";
import { Command } from "commander";
import "lib-config-app";
import connectDb from "lib-config-db";
import mongoose from "mongoose";

const program = new Command();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

program
  .option("-d, --dir <direction>", "migration direction", "up")
  .option("-s, --start <start>", "start migration index", (value) =>
    Number.parseInt(value, 10)
  )
  .option("-e, --end <end>", "end migration index", (value) =>
    Number.parseInt(value, 10)
  )
  .option("-h, --help", "display help for command");

program.parse(process.argv);

const options = program.opts();

connectDb();
main();

async function migrateDb() {
  const inc = options.dir === "up" ? 1 : -1;
  console.log(process.env.MONGODB_URL);

  console.log(
    `Migrating [${options.dir}] from [${options.start}] to [${options.end}]`
  );

  for (let i = options.start; i <= options.end; i += inc) {
    const filePath = path.join(__dirname, `./migrations/db_${i}.js`);
    console.log(`Processing migration from [${filePath}]`);
    await fs.promises.access(filePath);
    const module = await import(filePath);
    if (options.dir === "up") {
      await module.up();
    } else {
      await module.down();
    }
  }
  console.log(
    `Migration [${options.dir}] from [${options.start}] to [${options.end}] successfully applied`
  );
}

function validations() {
  if (options.help) {
    program.help();
    process.exit(0);
    return;
  }

  if (isNaN(options.start) || isNaN(options.end)) {
    console.error("Start and end options are mandatory");
    process.exit(1);
    return;
  }
}

async function mainInner() {
  if (options.dir === "up") {
    if (options.start > options.end) {
      console.error(
        "Start migration index should be less than end migration index"
      );
      process.exit(1);
      return;
    }
    await migrateDb();
  } else {
    if (options.start < options.end) {
      console.error(
        "Start migration index should be greater than end migration index"
      );
      process.exit(1);
      return;
    }
    await migrateDb();
  }
  process.exit();
}

async function main() {
  try {
    validations();
    await mainInner();
  } catch (err) {
    console.error(`Unexpected error during migration: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  }
}

// 'mongodb+srv://kunal21634267atlasmongo:sFkcBePYlAqUfZyE@cluster0.xrmze.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0'
// "mongodb+srv://kunal21634267atlasmongo:sFkcBePYlAqUfZyE@cluster0.xrmze.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0"
