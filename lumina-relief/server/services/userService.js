import prisma from "../config/database.js";
import toTitleCase from "../utils/titleCase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/userValidator.js";

const userService = {
  async setUser(data) {
    const validatedData = registerSchema.parse(data);

    console.log(validatedData);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      saltRounds,
    );

    return await prisma.user.create({
      data: {
        ...validatedData,
        name: toTitleCase(validatedData.name),
        password: hashedPassword,
      },
    });
  },

  async loginUser(data) {
    const validatedData = loginSchema.parse(data);

    const user = await prisma.user.findFirst({
      where: { email: validatedData.email },
    });
    if (
      !user ||
      !(await bcrypt.compare(validatedData.password, user.password))
    ) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { token, user: { id: user.id } };
  },
};

export default userService;
