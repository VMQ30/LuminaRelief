import locationContractService from "../services/locationContractService.js";

const connectLocationContact = async (req, res) => {
  try {
    const newLink = locationContractService.createLocationContractService(
      req.body,
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
    } else if (e.message === "All fields are required") {
      return res.status(400).json({ message: e.message });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default connectLocationContact;
