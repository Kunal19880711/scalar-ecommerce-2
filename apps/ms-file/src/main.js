import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import "lib-config-app";
import connectDb from "lib-config-db";
import File from "models/File";
import SimpleMongoGrpcServiceBuilder from "lib-utils-grpc/SimpleMongoGrpcServiceBuilder";
import { createGrpcServer } from "lib-utils-grpc/grpcServer";
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

const fileService = createGrpcServer([
  {
    service: fileProto.FileService.service,
    impl: {
      uploadFile: uploadFile,
      readFileInfo: simpleServiceProvider.createGet(),
      readAllFileInfos: simpleServiceProvider.createGetAll(),
    },
  },
]);

connectDb();

export default fileService;
