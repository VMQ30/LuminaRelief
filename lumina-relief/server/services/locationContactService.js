import prisma from "../config/database.js";
import { contactService, formatContactInfo } from "./contactService.js";
import { locationContactSchema } from "../validators/locationContactValidator.js";

const locationContactService = {
  async createLocationContactService(data) {
    const validatedData = locationContactSchema.parse(data);

    const locationExists = formatContactInfo(validatedData.contactVal);
    if (!locationExists) {
      throw new Error("Invalid contact format");
    }

    const targetContact = await contactService.createContact({
      contact: validatedData.contactVal,
    });

    return await prisma.locationContact.create({
      data: {
        locationId: validatedData.locationId,
        contactId: targetContact.id,
      },
    });
  },
};

export default locationContactService;
