import "dotenv/config";
console.log("Connecting to DB at:", process.env.DATABASE_URL);
import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
