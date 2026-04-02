import location from "../models/Location.js";
import NodeGeocoder from "node-geocoder";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

export const createLocation = async (req, res) => {
  try {
    const { name, barangay, city, province, region, zipCode, country, status } =
      req.body;

    if (
      !name ||
      !barangay ||
      !city ||
      !province ||
      !zipCode ||
      !country ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const address = `${barangay}, ${city}, ${province}, ${zipCode}, ${country}`;
    const geoResponse = await geocoder.geocode(address);

    if (!geoResponse.length) {
      return res.status(400).json({ message: "Could not find address" });
    }

    const coordinates = {
      lat: geoResponse[0].latitude,
      lng: geoResponse[0].longitude,
    };

    const newLocation = await location.setLocation({
      name,
      barangay,
      city,
      province,
      region,
      zipCode,
      country,
      status,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });

    return res
      .status(201)
      .json({ message: "Location successfully added", location: newLocation });
  } catch (e) {
    if (e.code === "P2002") {
      // Prisma Unique Constraint Error
      return res.status(400).json({ message: "Location name already exists" });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
