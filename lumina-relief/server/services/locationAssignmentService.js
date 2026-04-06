import prisma from "../config/database.js";
import { locationAssignmentSchema } from "../validators/locationAssignmentValidator.js";
const locationAssignmentService = {
  async createLocationAssignment(data) {
    const validatedData = locationAssignmentSchema.parse(data);

    const locationExists = await prisma.location.findUnique({
      where: { id: validatedData.locationId },
    });
    if (!locationExists) throw new Error("Location not Found");

    return await prisma.locationAssignment.create({
      data: {
        ...validatedData,
      },
    });
  },
};

export default locationAssignmentService;
