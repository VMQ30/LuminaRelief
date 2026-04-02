import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
