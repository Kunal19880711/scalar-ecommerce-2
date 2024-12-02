import bcrypt from "bcryptjs";
import User from "models/UserSchema";
import HttpError from "lib-utils-webserver/HttpError";
import constants from "lib-constants-system";

export const addAdmin = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req?.body?.email });

    if (userExists) {
      return res
        .status(200)
        .json({ message: "User already exists", success: true });
    }

    const userData = req.body || {};
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    userData.role = constants.userRoles.ADMIN;
    const user = await new User(userData);
    await user.save();
    res.status(200).json({
      message: "User created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ role: constants.userRoles.ADMIN });
    res.status(200).json({
      message: "Admins fetched successfully.",
      data: admins,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    const removeFields = ["password", "otp", "otpExpiry"];
    removeFields.forEach((field) => {
      if (updates[field]) {
        delete updates[field];
      }
    });

    const userToUpdate = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!userToUpdate) {
      throw new HttpError(404, "User not found.");
    }
    res.status(200).json({
      message: "User updated successfully.",
      success: true,
      data: userToUpdate,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findByIdAndDelete(id);
    if (!userToDelete) {
      throw new HttpError(404, "User not found.");
    }
    res.status(200).json({
      message: "User deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
