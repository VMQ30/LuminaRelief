import LocationAssignment from "../models/LocationAssignment.js";

const locationAssignment = async (req, res) => {
  try {
    const { locationId, userId } = req.body;

    if (!locationId || !userId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newLocationAssignment =
      await LocationAssignment.setLocationAssignment(+locationId, +userId);

    return res.status(201).json({
      message: "Successfully added user to location",
      data: newLocationAssignment,
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

export default locationAssignment;
