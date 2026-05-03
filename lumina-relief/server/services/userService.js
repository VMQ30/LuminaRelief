import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validators/userValidator.js";

const userService = {
  async setUser(data) {
    const validatedData = registerSchema.parse(data);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const query = `
      INSERT INTO users (name, email, password, contact)
      VALUES ($1, $2, $3, $4)
      `;

    const values = [
      validatedData.name,
      validatedData.email,
      hashedPassword,
      validatedData.contact,
    ];

    await pool.query(query, values);
    return { success: true, message: "User registered successfully" };
  },

  async loginUser(data) {
    const validatedData = loginSchema.parse(data);

    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const result = await pool.query(query, [validatedData.email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { token, user: { id: user.id } };
  },
};

export default userService;
