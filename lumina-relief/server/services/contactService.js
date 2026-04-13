import pool from "../config/database.js";
import { contactSchema } from "../validators/contactValidator.js";

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

  if (
    PH_LANDLINE_REGEX.test(numericOnly) ||
    (numericOnly.length === 10 && numericOnly.startsWith("0"))
  ) {
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
    const validatedData = contactSchema.parse(data);
    const { value, type } = validatedData.contact;

    const query = `
    SELECT * FROM contacts
    WHERE contact_info = $1
    `;

    const results = await pool.query(query, [value]);

    if (results.rows.length > 0) {
      return {
        success: true,
        message: "Contact already exists",
        data: results.rows[0],
      };
    }

    const insertQuery = `
      INSERT INTO contacts (contact_info, contact_type)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const insertResult = await pool.query(insertQuery, [value, type]);

    return {
      success: true,
      message: "Contact created successfully",
      data: insertResult.rows[0],
    };
  },
};
