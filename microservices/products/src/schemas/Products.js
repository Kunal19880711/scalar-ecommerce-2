import mongoose from "mongoose";

export const productEntityName = "Products";
export const productSchemaDef = {
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
};
export const productSchema = new mongoose.Schema(productSchemaDef, {
  timestamps: true,
});

export const ProductModel = mongoose.model(productEntityName, productSchema);