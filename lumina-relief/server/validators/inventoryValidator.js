import { z } from "zod";
export const inventorySchema = z.object({
  locationId: z.coerce.number().int().positive("Invalid Location ID"),
  resourceId: z.coerce.number().int().positive("Invalid Resource ID"),
  userId: z.coerce.number().int().positive("Invalid User ID"),
  quantity: z.coerce.number().nonnegative("Quantity cannot be negative"),
});

export const updateInventorySchema = z.object({
  inventoryId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
  changeAmount: z.coerce.number({ invalid_type_error: "Must be a number" }),
  action: z.enum(["ADD", "SUBTRACT", "ADJUSTMENT"], {
    errorMap: () => ({
      message: "Action must be ADD, SUBTRACT, or ADJUSTMENT",
    }),
  }),
});
