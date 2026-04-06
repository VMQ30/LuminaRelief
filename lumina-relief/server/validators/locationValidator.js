import { z } from "zod";
import toTitleCase from "../utils/titleCase.js";

export const locationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  barangay: z
    .string()
    .min(1, "Barangay is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  city: z
    .string()
    .min(1, "City is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  province: z
    .string()
    .min(1, "Province is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  zipCode: z
    .string()
    .min(1, "ZipCode is required")
    .trim()
    .transform((val) => toTitleCase(val)),
  country: z
    .string()
    .trim()
    .transform((val) => (val === "" ? "Philippines" : val))
    .default("Philippines")
    .transform((val) => toTitleCase(val)),
  status: z
    .enum(["ACTIVE", "INACTIVE", "FULL"], {
      errorMap: () => ({ message: "Invalid status selection" }),
    })
    .default("ACTIVE"),
});
