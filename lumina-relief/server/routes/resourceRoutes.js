import express from "express";
import {
  addResource,
  getAllResources,
} from "../controllers/resourceController.js";
import protect from "../middleware/auth.js";

const router = express.Router();
router.post("/add", protect, addResource);
router.get("/", getAllResources);

export default router;
