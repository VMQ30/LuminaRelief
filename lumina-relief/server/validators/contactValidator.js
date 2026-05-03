import { z } from "zod";
import { formatContactInfo } from "../services/contactService.js";

export const contactSchema = z.object({
  contact: z
    .string()
    .min(1, "Contact is required")
    .trim()
    .transform((val, ctx) => {
      const { value, type } = formatContactInfo(val);

      if (!type) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Invalid format. Must be a valid Email, Website, or PH Phone/Hotline.",
        });
        return z.NEVER;
      }

      return { value, type };
    }),
});
