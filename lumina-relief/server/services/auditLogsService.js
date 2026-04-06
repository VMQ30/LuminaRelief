import prisma from "../config/database.js";
import { auditLogsSchema } from "../validators/auditLogsValidator.js";

const auditLogService = {
  async setAuditLog(data) {
    const validatedData = auditLogsSchema.parse(data);

    return prisma.auditLog.create({
      data: { ...validatedData },
    });
  },
};

export default auditLogService;
