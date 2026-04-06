import { z } from "zod";
import toTitleCase from "../utils/titleCase.js";

export const resourceSchema = z.object({
  category: z
    .string()
    .min(1, "Category is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  unit: z
    .string()
    .min(1, "Unit is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  name: z
    .string()
    .min(1, "Name is required")
    .trim()
    .transform((val) => toTitleCase(val)),
});
