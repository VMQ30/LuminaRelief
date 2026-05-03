import NodeGeocoder from "node-geocoder";
import pool from "../config/database.js";
import { locationSchema } from "../validators/locationValidator.js";

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const locationService = {
  async createLocation(data) {
    const validatedData = locationSchema.parse(data);
    const address = `${validatedData.barangay}, ${validatedData.city}, ${validatedData.province}, ${validatedData.zipCode}, ${validatedData.country}`;

    let latitude, longitude;

    try {
      const geoResponse = await geocoder.geocode(address);

      if (!geoResponse || geoResponse.length === 0) {
        throw new Error("Could not find coordinates for the provided address");
      }

      latitude = geoResponse[0].latitude;
      longitude = geoResponse[0].longitude;
    } catch (geoError) {
      if (geoError.message.includes("Could not find")) throw geoError;

      console.error("Geocoding service failure:", geoError);
      throw new Error("Geocoding service currently unavailable");
    }

    const query = `
      INSERT INTO locations (
        name, latitude, longitude, barangay, city, 
        province, region, zip_code, country, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    const values = [
      validatedData.name,
      latitude,
      longitude,
      validatedData.barangay,
      validatedData.city,
      validatedData.province,
      validatedData.region,
      validatedData.zipCode,
      validatedData.country,
      validatedData.status,
    ];

    await pool.query(query, values);

    return {
      success: true,
      message: "Location created successfully",
    };
  },
};

export default locationService;
