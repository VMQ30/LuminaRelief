import prisma from "../config/database.js";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PH_PHONE_REGEX = /^(09|\+639)\d{9}$/;
const PH_LANDLINE_REGEX = /^0\d{2}\d{3}\d{4}$/;
const URL_REGEX =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const formatContactInfo = (input) => {
  let cleanData = input.trim().toLowerCase();
  const numericOnly = cleanData.replace(/\D/g, "");

  if (EMAIL_REGEX.test(cleanData)) {
    return { value: cleanData, type: "EMAIL" };
  }

  if (
    PH_PHONE_REGEX.test(numericOnly) ||
    (numericOnly.startsWith("639") && numericOnly.length === 12)
  ) {
    const base =
      numericOnly.length === 12 ? "0" + numericOnly.substring(2) : numericOnly;
    const formatted = `+63-${base.substring(1, 4)}-${base.substring(4, 7)}-${base.substring(7)}`;
    return { value: formatted, type: "PHONE" };
  }

  if (numericOnly.length === 10 && numericOnly.startsWith("0")) {
    let formatted = "";
    if (numericOnly.startsWith("02")) {
      formatted = `${numericOnly.substring(0, 2)}-${numericOnly.substring(2, 6)}-${numericOnly.substring(6)}`;
    } else {
      formatted = `${numericOnly.substring(0, 3)}-${numericOnly.substring(3, 6)}-${numericOnly.substring(6)}`;
    }
    return { value: formatted, type: "PHONE" };
  }

  if (URL_REGEX.test(cleanData)) {
    const formatted = cleanData.startsWith("http")
      ? cleanData
      : "https://" + cleanData;
    return { value: formatted, type: "WEBSITE" };
  }

  return { value: cleanData, type: null };
};

export const contactService = {
  async createContact(data) {
    if (!data.contact) {
      throw new Error("Missing required fields for Contact");
    }

    const { value, type } = formatContactInfo(data.contact);

    if (!type) {
      throw new Error(
        "Invalid contact format. Must be a valid Email , Website , or PH Phone/Hotline number.",
      );
    }

    const existing = await prisma.contact.findUnique({
      where: { contactInfo: value },
    });

    if (existing) return existing;

    return await prisma.contact.create({
      data: {
        contactInfo: value,
        contactType: type,
      },
    });
  },
};
