import express from "express";
import {
  setInventory,
  updateInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();
router.post("/add", setInventory);
router.post("/update", updateInventory);

export default router;
