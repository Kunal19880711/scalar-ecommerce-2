import fs from "fs";
import path from "path";
import url from "url";
import yaml from "js-yaml";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configFilePath = path.join(
  __dirname,
  ...new Array(3).fill(".."),
  "config.yaml"
);

const loadAppConfig = (filePath) => {
  const config = yaml.load(fs.readFileSync(filePath, "utf8"));
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
  });
};

loadAppConfig(configFilePath);
