import Resource from "../models/Resource.js";

const addResource = async (req, res) => {
  try {
    const { category, name, unit } = req.body;
    if (!category || !name || !unit) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newResource = await Resource.setResource({ category, name, unit });

    return res.status(201).json({
      message: "Successfully added resource",
      data: newResource,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "This user is already assigned to this location",
      });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default addResource;
