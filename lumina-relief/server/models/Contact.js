import prisma from "../config/database.js";

const Contact = {
  async setContact(contactValue) {
    return await prisma.contact.create({ data: { contactInfo: contactValue } });
  },

  async getContact(contact) {
    return await prisma.contact.findFirst({ where: { contactInfo: contact } });
  },
};

export default Contact;
