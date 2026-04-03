import prisma from "../config/database.js";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PH_PHONE_REGEX = /^(09|\+639)\d{9}$/;
const PH_LANDLINE_REGEX = /^0\d{2}\d{3}\d{4}$/;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const contactService = {
  async createContact(data) {
    if (!data.contact) {
      throw new Error("Missing required fields for Contact");
    }

    let cleanData = data.contact.trim().toLowerCase();
    let type = "";
    const numericOnly = cleanData.replace(/\D/g, "");

    if (EMAIL_REGEX.test(cleanData)) {
      type = "EMAIL";
    } else if (PH_PHONE_REGEX.test(numericOnly)) {
      type = "PHONE";
      const base =
        numericOnly.length === 12 ? numericOnly.substring(2) : numericOnly;
      cleanData = `+63-${base.substring(1, 4)}-${base.substring(4, 7)}-${base.substring(7)}`;
    } else if (PH_LANDLINE_REGEX.test(numericOnly)) {
      type = "PHONE";
      if (numericOnly.startsWith("02")) {
        cleanData = `${numericOnly.substring(0, 2)}-${numericOnly.substring(2, 6)}-${numericOnly.substring(6)}`;
      } else {
        cleanData = `${numericOnly.substring(0, 3)}-${numericOnly.substring(3, 6)}-${numericOnly.substring(6)}`;
      }
    } else if (URL_REGEX.test(cleanData)) {
      type = "WEBSITE";
      if (!cleanData.startsWith("http")) {
        cleanData = "https://" + cleanData;
      }
    } else {
      throw new Error(
        "Invalid contact format. Must be a valid Email , Website , or PH Phone/Hotline number.",
      );
    }

    return await prisma.contact.create({
      data: {
        contactInfo: cleanData,
        contactType: type,
      },
    });
  },
};

export default contactService;
