import mongoose from "mongoose";
import constants from "lib-constants-system";

export const userEntityName = "Users";
export const userSchemaDef = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(constants.userRoles),
    required: true,
    default: constants.userRoles.USER,
  },
  otp: {
    type: String,
    select: false,
  },
  otpExpiry: {
    type: Date,
    select: false,
  },
};
const userSchema = new mongoose.Schema(userSchemaDef, {
  timestamps: true,
});

const UserModel = mongoose.model(userEntityName, userSchema);
export default UserModel;
