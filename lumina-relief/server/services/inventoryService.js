import prisma from "../config/database.js";
import auditLogService from "./auditLogsService.js";

const getStatus = (q) => {
  if (q <= 0) return "OUT_OF_STOCK";
  if (q < 10) return "LOW_STOCK";
  if (q < 50) return "IN_STOCK";
  return "OVERSTOCK";
};

const inventoryService = {
  async setInventory(data) {
    if (
      data.quantity === undefined ||
      !data.locationId ||
      !data.resourceId ||
      !data.userId
    ) {
      throw new Error("All fields are required");
    }

    const quantity = +data.quantity;
    const locationId = +data.locationId;
    const resourceId = +data.resourceId;
    const userId = +data.userId;

    if ([quantity, locationId, resourceId].some(isNaN)) {
      throw new Error("Invalid values");
    }

    const locationExists = await prisma.location.findUnique({
      where: { id: locationId },
    });
    if (!locationExists) throw new Error("Location not Found");

    const resourceExists = await prisma.resource.findUnique({
      where: { id: resourceId },
    });
    if (!resourceExists) throw new Error("Resource not Found");

    const newInventory = await prisma.inventory.create({
      data: {
        quantity,
        stockLevel: getStatus(quantity),
        locationId,
        resourceId,
      },
    });

    await auditLogService.setAuditLog({
      inventoryId: newInventory.id,
      userId: +userId,
      prevQuantity: 0,
      newQuantity: quantity,
    });

    return newInventory;
  },

  async updateInventory(data) {
    if (!data.inventoryId || !data.userId || data.changeAmount === undefined) {
      throw new Error("Missing values for update");
    }

    const currentItem = await prisma.inventory.findUnique({
      where: { id: +data.inventoryId },
    });
    if (!currentItem) throw new Error("Inventory record not found");

    const prevQuantity = currentItem.quantity;
    const newQuantity = prevQuantity + +data.changeAmount;

    if (newQuantity < 0) throw new Error("Insufficient stock");

    const updatedInventory = await prisma.inventory.update({
      where: { id: +data.inventoryId },
      data: {
        quantity: newQuantity,
        stockLevel: getStatus(newQuantity),
      },
    });

    await auditLogService.setAuditLog({
      inventoryId: updatedInventory.id,
      userId: +data.userId,
      prevQuantity: prevQuantity,
      newQuantity: newQuantity,
    });

    return updatedInventory;
  },
};

export default inventoryService;
