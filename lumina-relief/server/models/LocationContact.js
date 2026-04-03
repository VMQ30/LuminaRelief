import prisma from "../config/database.js";

const LocationContact = {
  async linkContactToLocation(locationId, contactId) {
    return await prisma.locationContact.create({
      data: {
        locationId: +locationId,
        contactId: +contactId,
      },
    });
  },
};

export default LocationContact;
