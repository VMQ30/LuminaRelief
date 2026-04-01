import prisma from "../config/database.js";

const Location = {
  async setLocation(locationInfo) {
    return await prisma.location.create({ data: locationInfo });
  },

  async getAllLocations() {
    return await prisma.location.findMany;
  },
};

export default Location;
