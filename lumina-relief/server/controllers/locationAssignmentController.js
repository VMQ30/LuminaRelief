import locationAssignmentService from "../services/locationAssignmentService.js";

const locationAssignment = async (req, res) => {
  try {
    const newLocationAssignment =
      locationAssignmentService.createLocationAssignment(req.body);
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
