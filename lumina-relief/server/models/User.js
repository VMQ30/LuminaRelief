import prisma from "../config/database.js";

const User = {
  async setUser(userInfo) {
    return await prisma.user.create({ data: userInfo });
  },

  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async getUserByEmail(userEmail) {
    return await prisma.user.findFirst({ where: { email: userEmail } });
  },
};

export default User;
