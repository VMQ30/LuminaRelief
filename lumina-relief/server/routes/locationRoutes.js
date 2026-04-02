import express from "express";
import { createLocation } from "../controllers/locationController.js";

const router = express.Router();

router.post("/create", createLocation);

export default router;
