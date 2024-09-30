import { SimpleCurd } from "utilities";
import {
  productEntityName,
  productSchemaDef,
  ProductModel,
} from "../schemas/index.js";

export class ProductsController extends SimpleCurd {
  constructor(app) {
    super(app, {
      apiPath: "/shopApi",
      model: ProductModel,
      entityName: productEntityName,
      schemaDef: productSchemaDef,
    });
  }
  init() {
    this.createGetAll();
    this.createGet();
    this.createAdd();
    this.createUpdate();
    this.createDelete();
  }
}
