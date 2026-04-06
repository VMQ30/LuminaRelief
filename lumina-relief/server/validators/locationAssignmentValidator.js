import { z } from "zod";

export const locationAssignmentSchema = z.object({
  locationId: z.coerce
    .number({ invalid_type_error: "Invalid Location ID" })
    .int()
    .positive("Invalid Location ID"),
  userId: z.coerce
    .number({ invalid_type_error: "Invalid User ID" })
    .int()
    .positive("Invalid User ID"),
});
