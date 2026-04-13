import { z } from "zod";
import toTitleCase from "../utils/titleCase.js";

export const locationSchema = z.object({
  name: z.string().min(1).trim().transform(toTitleCase),
  barangay: z.string().min(1).trim().transform(toTitleCase),
  city: z.string().min(1).trim().transform(toTitleCase),
  province: z.string().min(1).trim().transform(toTitleCase),
  region: z.string().min(1).trim().toUpperCase(),
  zipCode: z.string().min(1).trim(),
  country: z.string().trim().default("Philippines").transform(toTitleCase),
  status: z.enum(["ACTIVE", "INACTIVE", "FULL"]).default("ACTIVE"),
});
