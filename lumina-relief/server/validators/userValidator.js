import { z } from "zod";
import { formatContactInfo } from "../services/contactService.js";

export const registerSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long").trim(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  contact: z
    .string()
    .min(1, "Contact is equired")
    .refine(
      (val) => {
        const { type } = formatContactInfo(val);
        return type && type !== "EMAIL";
      },
      {
        message:
          "Invalid contact format. Please provide a valid PH phone/landline number.",
      },
    )
    .transform((val) => {
      const { value } = formatContactInfo(val);
      return value;
    }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});
