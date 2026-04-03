import express from "express";
import addResource from "../controllers/resourceController.js";

const router = express.Router();
router.post("/add", addResource);

export default router;
