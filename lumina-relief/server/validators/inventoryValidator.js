import { z } from "zod";

export const inventorySchema = z.object({
  locationId: z.coerce
    .number({ invalid_type_error: "Invalid Location ID" })
    .int()
    .positive("Invalid Location ID"),
  resourceId: z.coerce
    .number({ invalid_type_error: "Invalid Resource ID" })
    .int()
    .positive("Invalid Resource ID"),
  userId: z.coerce
    .number({ invalid_type_error: "Invalid User ID" })
    .int()
    .positive("Invalid User ID"),
  quantity: z.coerce
    .number({ invalid_type_error: "Invalid Value for Quantity" })
    .positive("Invalid Value for Quantity"),
});

export const updateInventorySchema = z.object({
  inventoryId: z.coerce
    .number({ invalid_type_error: "Invalid Inventory ID" })
    .int()
    .positive("Invalid Inventory ID"),
  userId: z.coerce
    .number({ invalid_type_error: "Invalid User ID" })
    .int()
    .positive("Invalid User ID"),
  changeAmount: z.coerce
    .number({ invalid_type_error: "Invalid Value for Quantity" })
    .positive("Invalid Value for Quantity"),
  action: z.enum(["ADD", "SUBTRACT", "ADJUSTMENT"], {
    errorMap: () => ({
      message: "Action must be ADD, SUBTRACT, or ADJUSTMENT",
    }),
  }),
});
