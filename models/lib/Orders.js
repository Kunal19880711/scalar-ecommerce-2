import mongoose from "mongoose";

export const orderEntityName = "Orders";
export const orderSchemaDef = {
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
};
export const orderSchema = new mongoose.Schema(orderSchemaDef, {
  timestamps: true,
});

const OrderModel = mongoose.model(orderEntityName, orderSchema);
export default OrderModel;