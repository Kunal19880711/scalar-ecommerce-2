import { fileTypeFromBuffer } from "file-type";
import { v6 as uuidv6 } from "uuid";

import "lib-config-app";
import File from "models/File";
import GrpcError, { sendError } from "lib-error/GrpcError";
import errorStatus from "lib-error/errorStatus";

import { getCloudStorage } from "./getCloudStorage.js";

const storage = getCloudStorage();
const bucketName = process.env.CLOUD_STORAGE_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// File size and type validation
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];
const MIN_BYTES_FOR_MIME_DETECTION = 4100;

export const uploadFile = async (call, callback) => {
  const state = {
    call,
  };
  try {
    const fileInfo = await uploadFileToBucket(state);
    const savedFile = await saveFileInfo(fileInfo);
    callback(null, {
      success: true,
      message: "File uploaded successfully",
      data: savedFile,
    });
  } catch (error) {
    console.error(error);
    sendError(callback, error);
    if (state.filename) {
      bucket.file(state.filename).delete().catch(console.error);
    }
  } finally {
    call.end();
    if (state.writestream) {
      state.writestream.end();
    }
  }
};

const uploadFileToBucket = (state) => {
  const chunks = []; // Collect chunks for detecting the file type
  let fileSize = 0;
  let detectedFileType = null;
  return new Promise((resolve, reject) => {
    state.call.on("data", async (chunk) => {
      try {
        fileSize += chunk?.data?.length || 0;

        if (fileSize > MAX_FILE_SIZE) {
          throw new GrpcError(
            "File size exceeds limit (10MB)",
            errorStatus.BAD_REQUEST
          );
        }

        if (!detectedFileType) {
          chunks.push(chunk?.data);
          if (fileSize > MIN_BYTES_FOR_MIME_DETECTION) {
            const { fileType, buffer } = await getFileType(chunks);
            detectedFileType = fileType;
            state.filename = `file_${uuidv6()}.${detectedFileType.ext}`;
            state.writestream = bucket.file(state.filename).createWriteStream({
              resumable: true,
              predefinedAcl: "publicRead",
            });
            state.writestream.on("error", (err) => {
              reject(err);
            });
            state.writestream.write(buffer);
          }
        } else {
          state.writestream.write(chunk?.data);
        }
      } catch (err) {
        return reject(err);
      }
    });

    state.call.on("end", () => {
      const url = `https://storage.cloud.google.com/${bucketName}/${state.filename}`;
      const fileInfo = {
        url,
        mime: detectedFileType.mime,
        ext: detectedFileType.ext,
      };
      resolve(fileInfo);
    });

    state.call.on("error", (err) => {
      reject(err);
    });
  });
};

const getFileType = async (chunks) => {
  const buffer = Buffer.concat(chunks);
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType || !ALLOWED_TYPES.includes(fileType.mime)) {
    const errMsg = `Unsupported or unknown file type: ${
      fileType ? fileType.mime : "unknown"
    }. Allowed file types:[${ALLOWED_TYPES.join(", ")}]`;
    throw new GrpcError(errMsg, errorStatus.BAD_REQUEST);
  }

  return { fileType, buffer };
};

const saveFileInfo = async (fileInfo) => {
  const file = new File(fileInfo);
  return await file.save();
};
