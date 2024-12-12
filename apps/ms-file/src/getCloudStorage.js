import { Storage } from "@google-cloud/storage";

const state = {
  storage: null,
};

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

  if (process.env.GOOGLE_STORAGE_CREDENTIALS) {
    googleStorageConfig.credentials = process.env.GOOGLE_STORAGE_CREDENTIALS;
  }

  const storage = new Storage(googleStorageConfig);
  return (state.storage = storage);
}
