import mongoose from "mongoose";

export const fileEntityName = "Files";
export const fileSchemaDef = {
  url: {
    type: String,
    required: true,
  },
  mime: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
};
export const fileSchema = new mongoose.Schema(fileSchemaDef, {
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
  },
});

const FileModel = mongoose.model(fileEntityName, fileSchema);
export default FileModel;
