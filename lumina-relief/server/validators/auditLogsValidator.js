import { z } from "zod";

export const auditLogsSchema = z.object({
  inventoryId: z.coerce
    .number({ invalid_type_error: "Invalid Inventory ID" })
    .int()
    .positive("Invalid Inventory ID"),

  userId: z.coerce
    .number({ invalid_type_error: "Invalid User ID" })
    .int()
    .positive("Invalid User ID"),

  prevQuantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a valid number" })
    .nonnegative("Quantity cannot be negative"),

  newQuantity: z.coerce
    .number({ invalid_type_error: "Quantity must be a valid number" })
    .nonnegative("Quantity cannot be negative"),
});
