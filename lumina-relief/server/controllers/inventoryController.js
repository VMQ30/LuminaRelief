import inventoryService from "../services/inventoryService.js";
const errorMessages = [
  "Location not Found",
  "Resource not Found",
  "All fields are required",
];
const inventory = async (req, res) => {
  try {
    const newInventory = await inventoryService.setInventory(req.body);
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

export default inventory;
