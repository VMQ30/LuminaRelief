import userService from "../services/userService.js";
const errorMessages = [
  "All fields are required",
  "Email already in use",
  "Contact already in use",
];
export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const newUser = await userService.setUser({
      name,
      email,
      contact,
      password,
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
    if (e.code === "P2002") {
      return res.status(400).json({ message: "User already exists" });
    }
    if (errorMessages.includes(e.message) || e.message.includes("Invalid")) {
      return res.status(400).json({ message: e.message });
    }

    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser({ email, password });

    return res.status(200).json({
      message: "User successfully logged in",
      token: result.token,
      id: result.user.id,
    });
  } catch (e) {
    if (
      e.message === "Invalid email or password" ||
      e.message === "All fields are required"
    ) {
      return res.status(401).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
