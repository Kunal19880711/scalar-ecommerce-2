import path from "path";
import fs from "fs";
import { spawn } from "child_process";

const dirname = import.meta.dirname;
const ALL = "all";
const projectName = "scalar-e-commerce";
const region = "us-central1";

const DOCKER_TARGET = "sec-all";
const DOCKER_IMG_NAME = "sec-all";

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
    .description("deploy services to gcloud")
    .option("-f, --key-file <file>", "path of the gcloud key file")
    .action(deployServices);

  program.parse(process.argv);
}

async function buildDockerImage(services) {
  await asyncRun(
    `docker build --target ${DOCKER_IMG_NAME} -t ${DOCKER_TARGET} .`
  );
}

async function startDockerCompose(services, options) {
  const envVars = {
    CONFIG_YAML: fs.readFileSync("./config.yaml", "utf8"),
  };
  await asyncRun("docker compose up -d", { envVars });
}

async function stopDockerCompose(services) {
  await asyncRun("docker compose down");
}

async function deployServices(services, options) {
  const requestedServices = getServices(services);
  const isKeyFileProvided = options.keyFile && (await isFileExists(keyFile));

  await buildDockerImage(services);
  for (const service of requestedServices) {
    const imageName = getDockerImageName(service);
    const gCloudImageName = `gcr.io/${projectName}/${imageName}`;
    const gcloudServiceName = getGcloudServiceName(service);
    if (isKeyFileProvided) {
      await asyncRun(
        `gcloud auth activate-service-account --key-file ${keyFile}`
      );
    }
    await asyncRun("gcloud auth configure-docker --quiet");
    await asyncRun(`gcloud config set project ${projectName} --quiet`);
    await asyncRun(`docker tag ${imageName} ${gCloudImageName}`);
    await asyncRun(`docker push ${gCloudImageName}`);
    await asyncRun(
      [
        `gcloud run deploy ${gcloudServiceName}`,
        `--image ${gCloudImageName}`,
        "--port 8080",
        "--platform managed",
        `--region ${region}`,
        "--allow-unauthenticated",
      ].join(" ")
    );
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

function getContainerName(service) {
  return `sec2-${service}`;
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
