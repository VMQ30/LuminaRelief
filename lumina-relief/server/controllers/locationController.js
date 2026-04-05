import locationService from "../services/locationService.js";
const errorMessages = [
  "Location name already exists",
  "Could not find coordinates",
  "Missing required fields for Location",
  "Geocoding service currently unavailable",
];
export const createLocation = async (req, res) => {
  try {
    const { name, barangay, city, province, zipCode, country, status } =
      req.body;
    const newLocation = await locationService.createLocation({
      name,
      barangay,
      city,
      province,
      zipCode,
      country,
      status,
    });
    return res
      .status(201)
      .json({ message: "Location successfully added", location: newLocation });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({ message: e.message });
    } else if (errorMessages.some((msg) => e.message.includes(msg))) {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
