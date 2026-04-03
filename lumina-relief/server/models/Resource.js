import prisma from "../config/database.js";

const Resource = {
  async setResource(resource) {
    return await prisma.resource.create({ data: resource });
  },

  async getResource(resource) {
    return await prisma.resource.findFirst({ where: { name: resource } });
  },

  async getAllResource() {
    return await prisma.resource.findMany();
  },
};

export default Resource;
