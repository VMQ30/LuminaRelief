import resourceService from "../services/resourceService.js";

export const addResource = async (req, res) => {
  try {
    const { category, name, unit } = req.body;
    const newResource = await resourceService.setResource({
      category,
      name,
      unit,
    });

    return res.status(201).json({
      message: "Successfully added resource",
      data: newResource,
    });
  } catch (e) {
    if (e.message == "All fields are required") {
      return res.status(400).json({ message: e.message });
    } else if (e.code === "P2002") {
      return res.status(409).json({
        message: "This resourcealready exists",
      });
    }

    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllResource();
    return res.status(200).json(resources);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
