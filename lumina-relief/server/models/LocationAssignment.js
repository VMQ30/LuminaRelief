import prisma from "../config/database.js";

const LocationAssignment = {
  async setLocationAssignment(locationId, userId) {
    return await prisma.locationAssignment.create({
      data: {
        locationId: +locationId,
        userId: +userId,
      },
    });
  },
};

export default LocationAssignment;
