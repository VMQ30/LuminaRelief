import prisma from "../config/database.js";

const inventoryService = {
  async setInventory(data) {
    if (
      !data.quantity ||
      !data.stockLevel ||
      !data.locationId ||
      !data.resourceId
    ) {
      throw new Error("All fields are required");
    }

    const quantity = +data.quantity;
    const stockLevel = data.stockLevel.trim().toUpperCase();
    const locationId = +data.locationId;
    const resourceId = +data.resourceId;

    const locationExists = await prisma.location.findUnique({
      where: { id: locationId },
    });
    if (!locationExists) throw new Error("Location not Found");

    const resourceExists = await prisma.resource.findUnique({
      where: { id: resourceId },
    });
    if (!resourceExists) throw new Error("Resource not Found");

    return await prisma.inventory.create({
      data: {
        quantity,
        stockLevel,
        locationId,
        resourceId,
      },
    });
  },
};

export default inventoryService;
