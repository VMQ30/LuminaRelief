import contactService from "../services/contactService.js";
const errorMessages = ["Invalid contact format", "Missing required fields"];

const insertContact = async (req, res) => {
  try {
    const newContact = await contactService.createContact(req.body);
    return res
      .status(201)
      .json({ message: "Contact successfully created", contact: newContact });
  } catch (e) {
    if (errorMessages.includes(e.message)) {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default insertContact;
