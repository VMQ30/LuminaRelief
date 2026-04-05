import NodeGeocoder from "node-geocoder";
import prisma from "../config/database.js";
import toTitleCase from "../utils/titleCase.js";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const locationService = {
  async createLocation(data) {
    if (
      !data.name ||
      !data.barangay ||
      !data.city ||
      !data.province ||
      !data.zipCode ||
      !data.country ||
      !data.status
    ) {
      throw new Error("Missing required fields for Location");
    }
    const cleanData = {
      name: toTitleCase(data.name.trim()),
      barangay: toTitleCase(data.barangay.trim()),
      city: toTitleCase(data.city.trim()),
      province: toTitleCase(data.province.trim()),
      region: data.region.toUpperCase().trim(),
      zipCode: data.zipCode.trim(),
      country: toTitleCase(data.country.trim() || "Philippines"),
      status: data.status,
    };

    const address = `${cleanData.barangay}, ${cleanData.city}, ${cleanData.province}, ${cleanData.zipCode}, ${cleanData.country}`;

    try {
      const geoResponse = await geocoder.geocode(address);

      if (!geoResponse || geoResponse.length === 0) {
        throw new Error("Could not find coordinates for the provided address");
      }

      const latitude = geoResponse[0].latitude;
      const longitude = geoResponse[0].longitude;

      return await prisma.location.create({
        data: {
          ...cleanData,
          latitude,
          longitude,
        },
      });
    } catch (geoError) {
      if (geoError.message.includes("Could not find")) throw geoError;

      console.error("Geocoding service failure:", geoError);
      throw new Error("Geocoding service currently unavailable");
    }
  },
};

export default locationService;
