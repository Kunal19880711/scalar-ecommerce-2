import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectToDb from "../../config/db.js";
import ProductModel from "../../models/Products.js";
import SimpleCurdServiceBuilder from "../../utilities/SimpleCurdServiceBuilder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "..", "..", "protos", "products.proto")
);
const productsProto = grpc.loadPackageDefinition(packageDefinition).products;
const simpleServiceProvider = new SimpleCurdServiceBuilder({
  model: ProductModel,
  entityName: "Product"
});

dotenv.config();
connectToDb();

const productService = new grpc.Server();
productService.addService(productsProto.ProductService.service, {
  createProduct: simpleServiceProvider.createAdd(),
  readProduct: simpleServiceProvider.createGet(),
  readAllProducts: simpleServiceProvider.createGetAll(),
  patchProduct: simpleServiceProvider.createUpdate(),
  deleteProduct: simpleServiceProvider.createDelete(),
});
productService.bindAsync(
  process.env.PRODUCT_MS_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    productService.start();
  }
);
export default productService;
