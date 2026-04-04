import locationService from "../services/locationService.js";
const errorMessages = [
  "Location name already exists",
  "Could not find",
  "Missing required fields for Location",
];
export const createLocation = async (req, res) => {
  try {
    const newLocation = await locationService.createLocation(req.body);
    return res
      .status(201)
      .json({ message: "Location successfully added", location: newLocation });
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
