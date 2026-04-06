import { z } from "zod";

export const locationContactSchema = z.object({
  locationId: z.coerce
    .number({ invalid_type_error: "Invalid Location ID" })
    .int()
    .positive("Invalid Location ID"),
  contactVal: z.string().min(1, "Contact is required"),
});
