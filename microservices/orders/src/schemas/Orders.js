import mongoose from "mongoose";

export const orderEntityName = "Orders";
export const orderSchemaDef = {
  order_date: {
    type: Date,
    default: Date.now,
  },
  total_price: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
};
export const orderSchema = new mongoose.Schema(orderSchemaDef, {
  timestamps: true,
});

export const OrderModel = mongoose.model(orderEntityName, orderSchema);
