import { SimpleCurd } from "utilities";
import {
  OrderModel,
  orderEntityName,
  orderSchemaDef,
} from "../schemas/index.js";

export class OrdersController extends SimpleCurd {
  constructor(app) {
    super(app, {
      apiPath: "/ordersApi",
      model: OrderModel,
      entityName: orderEntityName,
      schemaDef: orderSchemaDef,
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
