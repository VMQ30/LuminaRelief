import NodeGeocoder from "node-geocoder";
import prisma from "../config/database.js";
import { locationSchema } from "../validators/locationValidator.js";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const locationService = {
  async createLocation(data) {
    const validatedData = locationSchema.parse(data);

    const address = `${validatedData.barangay}, ${validatedData.city}, ${validatedData.province}, ${validatedData.zipCode}, ${validatedData.country}`;

    try {
      const geoResponse = await geocoder.geocode(address);

      if (!geoResponse || geoResponse.length === 0) {
        throw new Error("Could not find coordinates for the provided address");
      }

      const latitude = geoResponse[0].latitude;
      const longitude = geoResponse[0].longitude;

      return await prisma.location.create({
        data: {
          ...validatedData,
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
