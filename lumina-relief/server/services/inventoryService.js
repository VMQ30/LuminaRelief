import prisma from "../config/database.js";
import auditLogService from "./auditLogsService.js";
import {
  inventorySchema,
  updateInventorySchema,
} from "../validators/inventoryValidator.js";

const getStatus = (q) => {
  if (q <= 0) return "OUT_OF_STOCK";
  if (q < 10) return "LOW_STOCK";
  if (q < 50) return "IN_STOCK";
  return "OVERSTOCKED";
};

const inventoryService = {
  async setInventory(data) {
    const validatedData = inventorySchema.parse(data);

    const query = `
      INSERT INTO inventories (quantity, status, location_id, resource_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      validatedData.quantity,
      getStatus(validatedData.quantity),
      validatedData.locationId,
      validatedData.resourceId,
    ];

    const result = await pool.query(query, values);
    const newInventory = result.rows[0];

    await auditLogService.setAuditLog({
      inventoryId: newInventory.inventory_id,
      userId: validatedData.userId,
      prevQuantity: 0,
      newQuantity: validatedData.quantity,
    });

    return { success: true, message: "Inventory successfully created" };
  },

  async updateInventory(data) {
    const validatedData = updateInventorySchema.parse(data);
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const findQuery = `SELECT * FROM inventories WHERE inventory_id = $1 FOR UPDATE`;
      const currentRes = await client.query(findQuery, [
        validatedData.inventoryId,
      ]);
      const currentItem = currentRes.rows[0];

      if (!currentItem) throw new Error("Inventory record not found");

      const prevQuantity = currentItem.quantity;
      let change = validated.changeAmount;

      let newQuantity;
      if (validatedData.action === "ADD") {
        newQuantity = prevQuantity + change;
      } else if (validatedData.action === "SUBTRACT") {
        newQuantity = prevQuantity - change;
      } else {
        newQuantity = change;
      }
      if (newQuantity < 0)
        throw new Error("Insufficient stock for this subtraction");

      const updateQuery = `
        UPDATE inventories 
        SET quantity = $1, status = $2, last_updated = NOW()
        WHERE inventory_id = $3
        RETURNING *;
      `;
      const updateRes = await client.query(updateQuery, [
        newQuantity,
        getStatus(newQuantity),
        validatedData.inventoryId,
      ]);

      await auditLogService.setAuditLog({
        inventoryId: validatedData.inventoryId,
        userId: validatedData.userId,
        prevQuantity: prevQuantity,
        newQuantity: newQuantity,
      });

      await client.query("COMMIT");
      return { success: true, message: "Inventory successfully updated" };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },
};

export default inventoryService;
