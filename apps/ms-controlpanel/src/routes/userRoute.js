import express from "express";
import validateJWTToken from "lib-utils-webserver/middlewares/validateJWTToken";
import {
  loginUser,
  logoutUser,
  viewCurrentUser,
  updateCurrentUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/viewCurrentUser", validateJWTToken, viewCurrentUser);
router.post("/updateCurrentUser", validateJWTToken, updateCurrentUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
