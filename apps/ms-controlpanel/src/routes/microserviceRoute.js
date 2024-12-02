import express from "express";
import {
  getAllMicroServices,
  createMicroService,
  updateMicroService,
  deleteMicroService,
} from "../controllers/microserviceController.js";

const router = express.Router();

router.get("/getAllMicroServices", getAllMicroServices);
router.post("/createMicroService", createMicroService);
router.patch("/updateMicroService/:id", updateMicroService);
router.delete("/deleteMicroService/:id", deleteMicroService);

export default router;
