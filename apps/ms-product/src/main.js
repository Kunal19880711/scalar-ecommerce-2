import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import "lib-config-app";
import connectDb from "lib-config-db";
import Product from "models/Products";
import SimpleMongoGrpcServiceBuilder from "lib-utils-grpc/SimpleMongoGrpcServiceBuilder";
import { createGrpcServer } from "lib-utils-grpc/grpcServer";

const dirname = import.meta.dirname;

const packageDefinition = protoLoader.loadSync(
  path.join(dirname, ...new Array(3).fill(".."), "protos", "product.proto"),
  { keepCase: true, longs: String, enums: String, oneofs: true }
);
const productProto = grpc.loadPackageDefinition(packageDefinition).product;
const simpleServiceProvider = new SimpleMongoGrpcServiceBuilder({
  model: Product,
  entityName: "Product",
});

const productService = createGrpcServer([
  {
    service: productProto.ProductService.service,
    impl: {
      createProduct: simpleServiceProvider.createAdd(),
      readProduct: simpleServiceProvider.createGet({
        expandOn: ["productMedia"],
      }),
      readAllProducts: simpleServiceProvider.createGetAll({
        expandOn: ["productMedia"],
      }),
      patchProduct: simpleServiceProvider.createPatch(),
      deleteProduct: simpleServiceProvider.createDelete(),
    },
  },
]);

connectDb();

export default productService;
