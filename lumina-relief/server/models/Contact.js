import prisma from "../config/database.js";

const Contact = {
  async setContact(contactInfo) {
    return await prisma.contact.create(contactInfo);
  },

  async getContact(contact) {
    return await prisma.contact.findFirst({ where: { contactInfo: contact } });
  },
};

export default Contact;
