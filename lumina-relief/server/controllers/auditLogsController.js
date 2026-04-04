import auditLogService from "../services/auditLogsService.js";

const auditLogs = async (req, res) => {
  try {
    const newAuditLog = await auditLogService.setAuditLog(req.body);
    return res.status(201).json({
      message: "Successfully added user to location",
      data: newAuditLog,
    });
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(409).json({
        message: "Already loggeds",
      });
    }
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default auditLogs;
