import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import "lib-config-app";
import connectDb from "lib-config-db";
import File from "models/File";
import SimpleMongoGrpcServiceBuilder from "lib-mongo-grpc/SimpleMongoGrpcServiceBuilder";
import { uploadFile } from "./uploadFile.js";
import constants from "lib-constants-system";

const dirname = import.meta.dirname;

const packageDefinition = protoLoader.loadSync(
  path.join(dirname, ...new Array(3).fill(".."), "protos", "file.proto"),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);
const fileProto = grpc.loadPackageDefinition(packageDefinition).file;
const simpleServiceProvider = new SimpleMongoGrpcServiceBuilder({
  model: File,
  entityName: "File",
});

const fileService = new grpc.Server();
fileService.addService(fileProto.FileService.service, {
  uploadFile: uploadFile,
  // readFileInfo: simpleServiceProvider.createGet(),
  readFileInfo: async (call, callback) => {
    // callback(null, {
    //   id: call.request.id,
    //   url: "http://google.com",
    //   mime: "image/png",
    //   ext: "png",
    //   createdAtTimestamp: new Date().getTime(),
    //   updatedAtTimestamp: new Date().getTime(),
    // });
    callback(null, {
      success: false,
      message: "File not found",
      errors: [
        {
          status: constants.errorStatus.NOT_FOUND,
          message: "File not found",
        },
      ],
    });
  },
});
fileService.bindAsync(
  "0.0.0.0:8080",
  grpc.ServerCredentials.createInsecure(),
  () => {
    fileService.start();
  }
);

connectDb();

export default fileService;
