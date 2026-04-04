import express from "express";
import inventory from "../controllers/inventoryController.js";

const router = express.Router();
router.post("/add", inventory);

export default router;
