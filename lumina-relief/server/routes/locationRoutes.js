import express from "express";
import { createLocation } from "../controllers/locationController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, createLocation);

export default router;
