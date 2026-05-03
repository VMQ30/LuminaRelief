import { z } from "zod";

export const locationAssignmentSchema = z.object({
  locationId: z.coerce.number().int().positive("Invalid Location ID"),
  userId: z.coerce.number().int().positive("Invalid User ID"),
});
