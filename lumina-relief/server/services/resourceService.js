import pool from "../config/database.js";
import { resourceSchema } from "../validators/resourceValidator.js";

const resourceService = {
  async setResource(data) {
    const validatedData = resourceSchema.parse(data);

    const query = `
    INSERT INTO resources (name , category , unit)
    VALUES ($1 , $2 , $3)
    `;
    await pool.query(query, [
      validatedData.name,
      validatedData.category,
      validatedData.unit,
    ]);

    return {
      success: true,
      message: "New resource successfully registered",
    };
  },

  async getAllResource() {
    const query = `
    SELECT * FROM resources
    ORDER BY name ASC
    `;
    const result = await pool.query(query);
    return result.rows;
  },
};

export default resourceService;
