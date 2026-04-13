import pool from "../config/database.js";
import { locationAssignmentSchema } from "../validators/locationAssignmentValidator.js";

const locationAssignmentService = {
  async createLocationAssignment(data) {
    const validatedData = locationAssignmentSchema.parse(data);

    const queryLoc = `
    SELECT location_id FROM locations WHERE location_id = $1
    `;

    const locResults = await pool.query(queryLoc, [validatedData.locationId]);
    if (locResults.rows.length === 0) {
      throw new Error("Location not found");
    }

    const queryDup = `
    SELECT location_assignment_id FROM location_assignments 
    WHERE location_id = $1 AND user_id = $2
    `;

    const dupResults = await pool.query(queryDup, [
      validatedData.locationId,
      validatedData.userId,
    ]);
    if (dupResults.rows.length > 0) {
      throw new Error("User is already assigned to this location");
    }

    const insertQuery = `
      INSERT INTO location_assignments (location_id, user_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    await pool.query(insertQuery, [
      validatedData.locationId,
      validatedData.userId,
    ]);

    return { success: true, message: "Assignment successfully created" };
  },
};

export default locationAssignmentService;
