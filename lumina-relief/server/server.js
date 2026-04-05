import userRoutes from "./routes/userRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import locationContactRoutes from "./routes/locationContactRoutes.js";
import locationAssignmentRoutes from "./routes/locationAssignmentRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again in an hour",
});
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/api/user", authLimiter, userRoutes);

app.use(generalLimiter);
app.use("/api/location", locationRoutes);
app.use("/api/location-contacts", locationContactRoutes);
app.use("/api/assign", locationAssignmentRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/inventory", inventoryRoutes);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: `The requested path ${req.originalUrl} was not found on this server.`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
