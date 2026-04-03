import user from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const newUser = await user.setUser({
      name,
      email,
      contact,
      password: hashedPass,
    });

    return res.status(201).json({
      message: "User successfully registered",
      user: {
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const results = await user.getUserByEmail(userEmail);
    if (!results) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(userPassword, results.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: results.id, email: results.email },
      { expiresIn: "1h" },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      message: "User successfully loged in",
      token,
      user: {
        id: results.id,
      },
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "This user is already registered",
      });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
