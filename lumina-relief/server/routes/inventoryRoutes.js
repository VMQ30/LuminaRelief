import express from "express";
import protect from "../middleware/auth.js";
import {
  setInventory,
  updateInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/add", protect, setInventory);
router.patch("/update/:id", protect, updateInventory);

export default router;
