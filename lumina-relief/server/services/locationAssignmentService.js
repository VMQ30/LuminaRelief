import prisma from "../config/database.js";

const locationAssignmentService = {
  async createLocationAssignment(data) {
    if (!data.locationId || !data.userId) {
      throw new Error("All fields are required");
    }

    const locationId = +data.locationId;
    const userId = +data.userId;

    if ([locationId, userId].some(isNaN)) {
      throw new Error("Invalid values");
    }

    const locationExists = await prisma.location.findUnique({
      where: { id: locationId },
    });
    if (!locationExists) throw new Error("Location not Found");

    return await prisma.locationAssignment.create({
      data: {
        locationId: locationId,
        userId: userId,
      },
    });
  },
};

export default locationAssignmentService;
