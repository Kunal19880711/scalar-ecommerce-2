import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "models/UserSchema";
import HttpError from "lib-utils-webserver/HttpError";
import { emailHelper, EMailTemplates } from "lib-utils-email";

export const loginUser = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req?.body?.email });

    if (!userExists) {
      throw new HttpError(400, "User doesn't exists. Please register.");
    }

    const validatePassword = await bcrypt.compare(
      req?.body?.password,
      userExists.password
    );
    if (!validatePassword) {
      throw new HttpError(400, "Please enter valid password.");
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const response = {
      message: "You have successfully logged in.",
      success: true,
    };

    res.cookie(process.env.SESSION_COOKIE_NAME, token, {
      maxAge:
        Number.parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10) ||
        24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie(process.env.SESSION_COOKIE_NAME);
    res.status(200).json({
      message: "You have successfully logged out.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const viewCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.body?.user?.userId);
    if (!user) {
      throw new HttpError(404, "You account have been deleted.");
    }
    res.status(200).json({
      data: user,
      success: true,
      message: "User details fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (req, res, next) => {
  try {
    const updates = req.body;
    const removeFields = ["email", "otp", "otpExpiry"];
    const userId = req.body.user.userId;
    removeFields.forEach((field) => {
      if (updates[field]) {
        delete updates[field];
      }
    });
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      throw new HttpError(404, "You account have been deleted.");
    }

    res.status(200).json({
      data: user,
      success: true,
      message: "User details updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new HttpError(400, "Please enter EMail for forgot password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    const otp = generateOtp(6);
    await User.findByIdAndUpdate(user._id, {
      otp,
      otpExpiry: Date.now() + 15 * 60 * 1000, // 15 mins
    });

    await emailHelper(EMailTemplates.Otp, user.email, {
      name: user.name,
      otp,
    });

    res.status(200).json({
      message: "OTP sent to your registered email.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      throw new HttpError(400, "All fields are required.");
    }
    const user = await User.findOne({
      email,
      otp,
    });
    if (!user) {
      throw new HttpError(400, "Invalid OTP.");
    }

    if (user.otpExpiry < Date.now()) {
      throw new HttpError(400, "Expired OTP. Regenerate new Otp.");
    }

    if (user.otp !== otp) {
      throw new HttpError(400, "Invalid OTP.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      $unset: {
        otp: "",
        otpExpiry: "",
      },
    });
    res.status(200).json({
      message: "Password reset successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

function generateOtp(length) {
  return Array.from({ length }, () => Math.floor(10 * Math.random())).join("");
}
