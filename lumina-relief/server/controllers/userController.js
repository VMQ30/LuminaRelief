import userService from "../services/userService.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = await userService.setUser(req.body);

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
      return res.status(400).json({ message: "Location name already exists" });
    }
    const clientErrors = [
      "All fields are required",
      "Email already in use",
      "Contact already in use",
    ];
    if (clientErrors.includes(e.message) || e.message.includes("Invalid")) {
      return res.status(400).json({ message: e.message });
    }

    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);

    return res.status(200).json({
      message: "User successfully logged in",
      token: result.token,
      id: result.user.id,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "This user is already registered",
      });
    } else if (
      e.message === "Invalid email or password" ||
      e.message === "All fields are required"
    ) {
      return res.status(401).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
