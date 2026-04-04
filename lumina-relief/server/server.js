import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import locationContactRoutes from "./routes/locationContactRoutes.js";
import locationAssignmentRoutes from "./routes/locationAssignmentRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/location-contacts", locationContactRoutes);
app.use("/api/assign", locationAssignmentRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/inventory", inventoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
