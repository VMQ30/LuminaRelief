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
  return "OVERSTOCK";
};

const inventoryService = {
  async setInventory(data) {
    const verifiedData = inventorySchema.parse(data);

    const locationExists = await prisma.location.findUnique({
      where: { id: verifiedData.locationId },
    });
    if (!locationExists) throw new Error("Location not Found");

    const resourceExists = await prisma.resource.findUnique({
      where: { id: verifiedData.resourceId },
    });
    if (!resourceExists) throw new Error("Resource not Found");

    const newInventory = await prisma.inventory.create({
      data: {
        ...verifiedData,
        stockLevel: getStatus(verifiedData.quantity),
      },
    });

    await auditLogService.setAuditLog({
      inventoryId: newInventory.id,
      userId: verifiedData.userId,
      prevQuantity: 0,
      newQuantity: verifiedData.quantity,
    });

    return newInventory;
  },

  async updateInventory(data) {
    const validatedData = updateInventorySchema.parse(data);

    const currentItem = await prisma.inventory.findUnique({
      where: { id: validatedData.inventoryId },
    });
    if (!currentItem) throw new Error("Inventory record not found");

    let newQuantity;
    if (validatedData.action === "ADD") {
      newQuantity = currentItem.quantity + validatedData.changeAmount;
    } else if (validatedData.action === "SUBTRACT") {
      newQuantity = currentItem.quantity - validatedData.changeAmount;
    } else {
      newQuantity = validatedData.changeAmount;
    }

    if (newQuantity < 0) throw new Error("Insufficient stock");

    const updatedInventory = await prisma.inventory.update({
      where: { id: validatedData.inventoryId },
      data: {
        quantity: newQuantity,
        stockLevel: getStatus(newQuantity),
      },
    });

    await auditLogService.setAuditLog({
      inventoryId: updatedInventory.id,
      userId: +data.userId,
      prevQuantity: currentItem.quantity,
      newQuantity: newQuantity,
    });

    return updatedInventory;
  },
};

export default inventoryService;
