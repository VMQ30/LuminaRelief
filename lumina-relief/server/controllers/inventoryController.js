import inventoryService from "../services/inventoryService.js";
const errorMessages = [
  "Location not Found",
  "Resource not Found",
  "All fields are required",
  "Missing values",
  "Inventory record not found",
  "Insufficient stock",
];

export const setInventory = async (req, res) => {
  try {
    const { quantity, locationId, resourceId } = req.body;

    const newInventory = await inventoryService.setInventory({
      quantity,
      locationId,
      resourceId,
      userId: req.user.id,
    });
    return res.status(201).json({
      message: "Inventory successfully added",
      inventory: newInventory,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({ message: e.message });
    } else if (errorMessages.includes(e.message)) {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id ?? req.body.inventoryId;
    const { changeAmount, action } = req.body;
    const updatedData = {
      inventoryId,
      action,
      changeAmount,
      userId: req.user.id,
    };
    const updatedInventory =
      await inventoryService.updateInventory(updatedData);
    return res.status(201).json({
      message: "Inventory successfully updated",
      inventory: updatedInventory,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({ message: e.message });
    } else if (errorMessages.includes(e.message)) {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
