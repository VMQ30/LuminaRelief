import prisma from "../config/database.js";

const locationAssignmentService = {
  async createLocationAssignment(data) {
    if (!data.locationId || !data.userId) {
      throw new Error("All fields are required");
    }

    const locationExists = await prisma.location.findUnique({
      where: { id: data.locationId },
    });
    if (!locationExists) throw new Error("LOCATION_NOT_FOUND");

    return await prisma.locationAssignment.create({
      data: {
        locationId: +data.locationId,
        userId: +data.userId,
      },
    });
  },
};

export default locationAssignmentService;
