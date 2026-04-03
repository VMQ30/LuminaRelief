import LocationContact from "../models/LocationContact.js";
import Contact from "../models/Contact.js";

const connectLocationContact = async (req, res) => {
  try {
    const { locationId, contactVal } = req.body;

    if (!locationId || !contactVal) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let targetContact = await Contact.getContact(contactVal);
    if (!targetContact) {
      targetContact = await Contact.setContact(contactVal);
    }

    const newLink = await LocationContact.linkContactToLocation(
      locationId,
      targetContact.id,
    );

    return res.status(201).json({
      message: "Successfully added contact to location",
      data: newLink,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "This contact is already assigned to this location",
      });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default connectLocationContact;
