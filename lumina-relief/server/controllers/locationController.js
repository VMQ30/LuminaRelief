import locationService from "../services/locationService.js";

export const createLocation = async (req, res) => {
  try {
    const newLocation = await locationService.createLocation(req.body);
    return res
      .status(201)
      .json({ message: "Location successfully added", location: newLocation });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(400).json({ message: "Location name already exists" });
    } else if (
      e.message === "Could not find coordinates for the provided address"
    ) {
      return res.status(400).json({ message: e.message });
    } else if (e.message === "Missing required fields for Location") {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
