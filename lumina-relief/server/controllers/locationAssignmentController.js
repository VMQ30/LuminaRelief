import locationAssignmentService from "../services/locationAssignmentService.js";

const locationAssignment = async (req, res) => {
  try {
    const { locationId } = req.body;
    const newLocationAssignment =
      await locationAssignmentService.createLocationAssignment({
        locationId,
        userId: req.user.id,
      });
    return res.status(201).json({
      message: "Successfully added user to location",
      data: newLocationAssignment,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "This user is already assigned to this location",
      });
    } else if (
      e.message === "Location not Found" ||
      e.message === "All fields are required"
    ) {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default locationAssignment;
