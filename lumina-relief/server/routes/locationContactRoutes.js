import express from "express";
import protect from "../middleware/auth.js";
import connectLocationContact from "../controllers/locationContactController.js";

const router = express.Router();
router.post("/link", protect, connectLocationContact);

export default router;
