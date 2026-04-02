import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/location", locationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
