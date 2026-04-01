import user from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await user.setUser({ name, email, password, contact });

    return res.status(201).json({
      message: "User successfully registered",
      user: newUser,
    });
  } catch (e) {
    console.log(e);
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

    if (results.password !== userPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res
      .status(200)
      .json({ message: "User successfully loged in", user: results });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
