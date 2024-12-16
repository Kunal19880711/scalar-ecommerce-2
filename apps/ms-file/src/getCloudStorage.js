import { Storage } from "@google-cloud/storage";

const state = {
  storage: null,
};

const PRIVATE_KEY = "private_key";

export function getCloudStorage() {
  if (state.storage) {
    return state.storage;
  }
  if (!process.env.GOOGLE_PROJECT_ID) {
    throw new Error("GOOGLE_PROJECT_ID is not set");
  }
  const googleStorageConfig = {
    projectId: process.env.GOOGLE_PROJECT_ID,
  };

  if (!process.env.GOOGLE_STORAGE_CREDENTIALS) {
    throw new Error("GOOGLE_STORAGE_CREDENTIALS is not set");
  }
  googleStorageConfig.credentials = JSON.parse(
    base64Decode(process.env.GOOGLE_STORAGE_CREDENTIALS)
  );
  if (!googleStorageConfig?.credentials?.private_key) {
    throw new Error("GOOGLE_STORAGE_CREDENTIALS is not set");
  }
  googleStorageConfig.credentials[PRIVATE_KEY] =
    googleStorageConfig.credentials[PRIVATE_KEY].replace(/\\n/g, "\n");

  const storage = new Storage(googleStorageConfig);
  return (state.storage = storage);
}

function base64Decode(data) {
  return Buffer.from(data, "base64").toString("utf-8");
}
