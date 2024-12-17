import path from "path";
import fs from "fs";
import { spawn } from "child_process";
const { program } = await import("commander");

const allServices = ["ms-controlpanel", "ms-file"];
const projectName = "scalar-e-commerce";
const region = "us-central1";

const DOCKER_TARGET = "sec-all";
const DOCKER_IMG_NAME = "sec-all:latest";

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
  program
    .command("build")
    .description(`build docker image: [${DOCKER_IMG_NAME}]`)
    .action(buildDockerImage);

  program
    .command("start")
    .description("start docker compose")
    .action(startDockerCompose);

  program
    .command("stop")
    .description("stop docker compose")
    .action(stopDockerCompose);

  program
    .command("deploy")
    .description("deploy to gcloud")
    .option(
      "-s, --service <service>",
      "name of service, if a single service is to be deployed"
    )
    .option("-f, --key-file <file>", "path of the gcloud key file")
    .action(deployToGcloud);

  program.parse(process.argv);
}

async function buildDockerImage() {
  await asyncRun(
    `docker build --target ${DOCKER_TARGET} -t ${DOCKER_IMG_NAME} .`
  );
}

async function startDockerCompose() {
  const envVars = {
    CONFIG_YAML: fs.readFileSync("./config.yaml", "utf8"),
  };
  await asyncRun("docker compose up -d", { envVars });
}

async function stopDockerCompose() {
  await asyncRun("docker compose down");
}

async function deployToGcloud() {
  const options = this.opts();
  if (options.service && !allServices.includes(options.service)) {
    console.error(
      `Service [${options.service}] is not supported. Valid services are [${allServices}]`
    );
    process.exit(1);
  }

  const isKeyFileProvided = options.keyFile && (await isFileExists(keyFile));
  const gCloudImageName = `gcr.io/${projectName}/${DOCKER_IMG_NAME}`;
  const services = options.service ? [options.service] : allServices;
  await buildDockerImage();
  if (isKeyFileProvided) {
    await asyncRun(
      `gcloud auth activate-service-account --key-file ${keyFile}`
    );
  }
  await asyncRun("gcloud auth configure-docker --quiet");
  await asyncRun(`gcloud config set project ${projectName} --quiet`);
  await asyncRun(`docker tag ${DOCKER_IMG_NAME} ${gCloudImageName}`);
  await asyncRun(`docker push ${gCloudImageName}`);
  for (let service of services) {
    const gcloudServiceName = getGcloudServiceName(service);
    const cmd = [
      `gcloud run deploy ${gcloudServiceName}`,
      `--image ${gCloudImageName}`,
      "--port 8080 --platform managed",
      `--region ${region}`,
      "--allow-unauthenticated",
      `--command=pnpm --args=--filter --args=${service} --args=start`,
      `--set-secrets CONFIG_YAML=CONFIG_YAML:latest`,
    ].join(" ");
    await asyncRun(cmd);
  }
}

async function asyncRun(cmd, options = {}) {
  const { print = true, envVars = {} } = options;
  console.log(`Running command: ${cmd}`);
  return new Promise((resolve, reject) => {
    const [program, ...args] = cmd.split(" ").filter(Boolean);
    const subprocess = spawn(program, args, {
      env: { ...process.env, ...envVars },
    });

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

function getGcloudServiceName(service) {
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
