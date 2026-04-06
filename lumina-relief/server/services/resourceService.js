import prisma from "../config/database.js";
import { resourceSchema } from "../validators/resouceValidator.js";

const resourceService = {
  async setResource(data) {
    const validatedData = resourceSchema.parse(data);
    return prisma.resource.create({
      data: { ...validatedData },
    });
  },
};

export default resourceService;
