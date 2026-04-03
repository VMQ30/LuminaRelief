import express from "express";
import connectLocationContact from "../controllers/locationContactController";

const router = express.Router();
router.post("/link", connectLocationContact);

export default router;
