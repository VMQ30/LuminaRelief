import express from "express";
import protect from "../middleware/auth.js";
import locationAssignment from "../controllers/locationAssignmentController.js";

const router = express.Router();
router.post("/link", protect, locationAssignment);

export default router;
