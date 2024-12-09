import path from "path";
import fs from "fs";
import { spawn } from "child_process";

const dirname = import.meta.dirname;
const ALL = "all";
const projectName = "scalar-e-commerce";
const region = "us-central1";
const allServices = new Set(["ms-controlpanel"]);
const allServicesInfo = new Map([["ms-controlpanel", { port: 8000 }]]);

main();

function setup() {
  const dirname = import.meta.dirname;
  const projectRoot = path.normalize(
    path.join(dirname, ...new Array(3).fill(".."))
  );
  console.log(projectRoot);
  process.chdir(projectRoot);
}

async function main() {
  setup();
  await runProgram();
}

async function runProgram() {
  const { program } = await import("commander");

  program
    .command("build <services>")
    .description("build docker images for services")
    .action(buildServices);

  program
    .command("start <services>")
    .description("start services")
    .option("-p, --privileged", "run with privileged mode", false)
    .option("-l, --local", "run in dev mode locally", false)
    .action(startServices);

  program
    .command("stop <services>")
    .description("stop services")
    .action(stopServices);

  program
    .command("deploy <services>")
    .description("deploy services")
    .requiredOption("-f, --key-file <file>", "path of the gcloud key file")
    .action(deployServices);

  program.parse(process.argv);
}

async function buildServices(services) {
  const requestedServices = getServices(services);
  for (const service of requestedServices) {
    const imageName = getDockerImageName(service);
    await asyncRun(`docker build --target ${service} -t ${imageName} .`);
  }
}

async function startServices(services, options) {
  const requestedServices = getServices(services);
  const privileged = options.privileged ? "--privileged" : "";
  const localOption = options.local
    ? ""
    : `-e CONFIG_YAML=${fs.readFileSync("./config.yaml", "utf8")}`;
  for (const service of requestedServices) {
    const containerName = getContainerName(service);
    const imageName = getDockerImageName(service);
    await asyncRun(
      `docker run ${privileged} -d --name ${containerName} ${localOption} ${imageName}`
    );
  }
}

async function stopServices(services) {
  const requestedServices = getServices(services);
  for (const service of requestedServices) {
    const containerName = getContainerName(service);
    await asyncRun(`docker rm -f ${containerName}`);
  }
}

async function deployServices(services, options) {
  const requestedServices = getServices(services);
  const keyFile = options.keyFile;
  const isKeyFileExists = await isFileExists(keyFile);
  if (!isKeyFileExists) {
    console.error(`Key file ${keyFile} does not exists`);
    process.exit(1);
  }

  await buildServices(services);
  for (const service of requestedServices) {
    const imageName = getDockerImageName(service);
    const gCloudImageName = `gcr.io/${projectName}/${imageName}`;
    const port = allServicesInfo.get(service).port;
    await asyncRun(
      `gcloud auth activate-service-account --key-file ${keyFile}`
    );
    await asyncRun("gcloud auth configure-docker --quiet");
    await asyncRun(`gcloud config set project ${projectName} --quiet`);
    await asyncRun(`docker tag ${imageName} ${gCloudImageName}`);
    await asyncRun(`docker push ${gCloudImageName}`);
    await asyncRun(
      [
        `gcloud run deploy ${service}`,
        `--image ${gCloudImageName}`,
        "--platform managed",
        `--region ${region}`,
        "--allow-unauthenticated",
      ].join(" ")
    );
  }
}

function getServices(services) {
  const allServicesArr = [...allServices];
  if (services === ALL) {
    return allServicesArr;
  }
  const requestedServices = (services.split(" ") || [])
    .filter((s) => !!s)
    .map((s) => s.trim().toLowerCase());
  const invalidServices = requestedServices.filter((s) => !allServices.has(s));

  if (invalidServices.length > 0) {
    const errStr = `Invalid services: ${invalidServices}. Valid services: ${allServicesArr}`;
    console.error(errStr);
    process.exit(1);
  }
  return requestedServices;
}

async function asyncRun(cmd, print = true) {
  console.log(`Running command: ${cmd}`);
  return new Promise((resolve, reject) => {
    const [program, ...args] = cmd.split(" ").filter(Boolean);
    const subprocess = spawn(program, args);

    if (print) {
      subprocess.stdout.on("data", (data) => console.log(data.toString()));
      subprocess.stderr.on("data", (data) => console.error(data.toString()));
    }

    subprocess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function getContainerName(service) {
  return `sec2-${service}`;
}

function getDockerImageName(service) {
  return `sec2-${service}`;
}

function isFileExists(filepath) {
  return new Promise((resolve) => {
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
