import mongoose from "mongoose";

export const microServiceEntityName = "Microservices";
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

const MicroserviceModel = mongoose.model(
  microServiceEntityName,
  microServiceSchema
);
export default MicroserviceModel;
