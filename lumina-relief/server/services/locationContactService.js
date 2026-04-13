import pool from "../config/database.js";
import { contactService, formatContactInfo } from "./contactService.js";
import { locationContactSchema } from "../validators/locationContactValidator.js";

const locationContactService = {
  async createLocationContactService(data) {
    const validatedData = locationContactSchema.parse(data);
    const { locationId, contactVal } = validatedData;

    const { value: formattedVal, type } = formatContactInfo(data.contactVal);
    if (!type) {
      throw new Error("Invalid contact format");
    }

    let contactId;
    const findContactQuery = `SELECT contact_id FROM contacts WHERE contact_info = $1`;
    const contactRes = await pool.query(findContactQuery, [formattedVal]);

    if (contactRes.rows.length > 0) {
      contactId = contactRes.rows[0].contact_id;
    } else {
      const newContact = await contactService.createContact({
        contact: contactVal,
      });
      contactId = newContact.data.contact_id;
    }

    const checkLinkQuery = `
      SELECT id FROM location_contacts 
      WHERE location_id = $1 AND contact_id = $2
    `;
    const linkRes = await pool.query(checkLinkQuery, [locationId, contactId]);

    if (linkRes.rows.length > 0) {
      return {
        success: true,
        message: "Contact already linked to this location",
      };
    }

    const insertLinkQuery = `
      INSERT INTO location_contacts (location_id, contact_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    await pool.query(insertLinkQuery, [locationId, contactId]);

    return {
      success: true,
      message: "Contact successfully linked to location",
    };
  },
};

export default locationContactService;
