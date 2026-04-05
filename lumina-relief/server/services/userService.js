import prisma from "../config/database.js";
import toTitleCase from "../utils/titleCase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { formatContactInfo } from "./contactService.js";

const userService = {
  async setUser(data) {
    if (!data.name || !data.email || !data.password || !data.contact) {
      throw new Error("All fields are required");
    }

    const { value: formattedContact, type: contactType } = formatContactInfo(
      data.contact,
    );
    if (!contactType || contactType === "EMAIL") {
      throw new Error(
        "Invalid contact format. Please provide a valid PH phone/landline number.",
      );
    }

    const { value: validatedEmail, type: emailType } = formatContactInfo(
      data.email.trim().toLowerCase(),
    );
    if (emailType !== "EMAIL") {
      throw new Error("Invalid email address. Please provide a valid email.");
    }

    const saltRounds = 10;
    const name = toTitleCase(data.name.trim());
    const email = validatedEmail;
    const password = await bcrypt.hash(data.password, saltRounds);
    const contact = formattedContact;

    return await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        contact: contact,
      },
    });
  },

  async loginUser(data) {
    if (!data.email || !data.password) {
      throw new Error("All fields are required");
    }

    const email = data.email.trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
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
