import express from "express";

import {
  addAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.get("/getAllAdmins", getAllAdmins);
router.patch("/updateAdmin/:id", updateAdmin);
router.delete("/deleteAdmin/:id", deleteAdmin);

export default router;
