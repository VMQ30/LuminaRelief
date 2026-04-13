import pool from "../config/database.js";
import { auditLogsSchema } from "../validators/auditLogsValidator.js";

const auditLogService = {
  async setAuditLog(data, client = null) {
    const validatedData = auditLogsSchema.parse(data);

    const query = `
    INSERT INTO audit_logs (inventory_id , user_id , prev_quantity, new_quantity)
    VALUES ($1 , $2, $3, $4)
    `;

    const values = [
      validatedData.inventoryId,
      validatedData.userId,
      validatedData.prevQuantity,
      validatedData.newQuantity,
    ];

    await pool.query(query, values);
    return { success: true, message: "Audit log successfully created" };
  },
};

export default auditLogService;
