import contact from "../models/Contact.js";

const insertContact = async (req, res) => {
  try {
    const { userContact } = req.body;
    if (!userContact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contactInfo = await contact.getContact(userContact);
    if (contactInfo) {
      return res.status(200).json({
        message: "Contact already exists, returning existing data",
        data: contactInfo,
      });
    }

    const newContact = await contact.setContact(userContact);

    return res
      .status(201)
      .json({ message: "Contact successfully created", contact: newContact });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default insertContact;
