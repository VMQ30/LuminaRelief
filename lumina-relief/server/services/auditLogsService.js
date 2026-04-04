import prisma from "../config/database.js";

const auditLogService = {
  async setAuditLog(data) {
    if (
      !data.inventoryId ||
      !data.userId ||
      !data.prevQuantity ||
      !data.newQuantity
    ) {
      throw new Error("All fields are required");
    }

    const inventoryId = +data.inventoryId;
    const userId = +data.userId;
    const prevQuantity = +data.prevQuantity;
    const newQuantity = +data.newQuantity;

    if ([inventoryId, userId, prevQuantity, newQuantity].some(isNaN)) {
      throw new Error("Invalid numeric values provided for audit log");
    }

    return prisma.auditLog.create({
      data: { inventoryId, userId, prevQuantity, newQuantity },
    });
  },
};

export default auditLogService;
