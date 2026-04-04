import prisma from "../config/database.js";
import { contactService, formatContactInfo } from "./contactService.js";

const locationContractService = {
  async createLocationContractService(data) {
    if (!data.locationId || !data.contactVal) {
      throw new Error("All fields are required");
    }
    const { value: formattedVal, type } = formatContactInfo(data.contactVal);
    if (!type) {
      throw new Error("Invalid contact format");
    }

    let targetContact = await prisma.contact.findFirst({
      where: { contactInfo: formattedVal },
    });

    if (!targetContact) {
      targetContact = await contactService.createContact({
        contact: data.contactVal,
      });
    }

    return await prisma.locationContact.create({
      data: {
        locationId: +data.locationId,
        contactId: targetContact.id,
      },
    });
  },
};

export default locationContractService;
