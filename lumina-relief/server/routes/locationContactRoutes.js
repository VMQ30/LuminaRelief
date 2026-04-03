import express from "express";
import connectLocationContact from "../controllers/locationContactController.js";

const router = express.Router();
router.post("/link", connectLocationContact);

export default router;
