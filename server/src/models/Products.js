import mongoose from "mongoose";

export const productEntityName = "Products";
export const productSchemaDef = {
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
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
  virtuals: {
    createdAtTimestamp: {
      get() {
        return this.createdAt.getTime();
      },
    },
    updatedAtTimestamp: {
      get() {
        return this.updatedAt.getTime();
      },
    },
  }
});

const ProductModel = mongoose.model(productEntityName, productSchema);
export default ProductModel;
