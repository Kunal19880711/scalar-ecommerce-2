import mongoose from "mongoose";

export const microServiceEntityName = "MicroServices";
export const microServiceSchemaDef = {
  serviceName: {
    type: String,
    required: true,
  },
  serviceUrl: {
    type: String,
    required: true,
  },
};
export const microServiceSchema = new mongoose.Schema(microServiceSchemaDef, {
  timestamps: true,
});

const MicroServiceModel = mongoose.model(
  microServiceEntityName,
  microServiceSchema
);
export default MicroServiceModel;
