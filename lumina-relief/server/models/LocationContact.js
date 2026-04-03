import prisma from "../config/database.js";

const LocationContact = {
  async linkContactToLocation(locationId, contactId) {
    return await prisma.locationContact.create({
      data: {
        locationId: parseInt(locationId),
        contactId: parseInt(contactId),
      },
    });
  },
};

export default LocationContact;
