import express from "express";
import locationAssignment from "../controllers/locationAssignmentController.js";

const router = express.Router();
router.post("/link", locationAssignment);

export default router;
