import { z } from "zod";
import toTitleCase from "../utils/titleCase.js";

export const resourceSchema = z.object({
  name: z
    .string()
    .min(1, "Resource name is required")
    .trim()
    .transform(toTitleCase),
  category: z
    .string()
    .min(1, "Category is required")
    .trim()
    .transform(toTitleCase),
  unit: z
    .string()
    .min(1, "Unit of measurement is required")
    .trim()
    .transform(toTitleCase),
});
