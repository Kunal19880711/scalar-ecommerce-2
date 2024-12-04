import express from "express";
import {
  getAllMicroservices,
  createMicroservice,
  updateMicroservice,
  deleteMicroservice,
} from "../controllers/microserviceController.js";

const router = express.Router();

router.get("/getAllMicroservices", getAllMicroservices);
router.post("/createMicroservice", createMicroservice);
router.patch("/updateMicroservice/:id", updateMicroservice);
router.delete("/deleteMicroservice/:id", deleteMicroservice);

export default router;
