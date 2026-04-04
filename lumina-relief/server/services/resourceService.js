import prisma from "../config/database.js";
import toTitleCase from "../utils/titleCase.js";

const resourceService = {
  async setResource(data) {
    if (!data.category || !data.name || !data.unit) {
      throw new Error("All fields are required");
    }

    const category = toTitleCase(data.category.trim());
    const unit = toTitleCase(data.unit.trim());
    const name = toTitleCase(data.name.trim());

    return prisma.resource.create({
      data: { category: category, name: name, unit: unit },
    });
  },
};

export default resourceService;
