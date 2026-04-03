import contactService from "../services/contactService";

const insertContact = async (req, res) => {
  try {
    const newContact = await contactService.createContact(req.body);
    return res
      .status(201)
      .json({ message: "Contact successfully created", contact: newContact });
  } catch (e) {
    if (e.message == "Missing required fields for Contact") {
      return res.status(400).json({ message: e.message });
    } else if (
      e.message ==
      "Invalid contact format. Must be a valid Email , Website , or PH Phone/Hotline number."
    ) {
      return res.status(400).json({ message: e.message });
    }
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default insertContact;
