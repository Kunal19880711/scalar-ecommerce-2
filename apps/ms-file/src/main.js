import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import "lib-config-app";
import connectDb from "lib-config-db";
import File from "models/File";
import SimpleMongoGrpcServiceBuilder from "lib-utils-grpc/SimpleMongoGrpcServiceBuilder";
import { uploadFile } from "./uploadFile.js";

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
  readFileInfo: simpleServiceProvider.createGet(),
});
fileService.bindAsync(
  "0.0.0.0:8080",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server started on port 8080");
  }
);

connectDb();

export default fileService;
