import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Filter,
  Download,
  Search,
  Clock,
  Package,
  ClipboardList,
} from "lucide-react";
import styles from "../styles/CompanyDashboard.module.css";

// ─── Mock Log Data ────────────────────────────────────────────────────────────
const MOCK_LOGS = [
  {
    id: 1,
    type: "ALLOCATION_OUT",
    resource: "Rice Sacks (25kg)",
    category: "Food",
    amount: 50,
    unit: "sacks",
    reason: "Distributed to evacuation center A",
    timestamp: "2025-07-15T12:08:00",
    location: "Northern Samar Hub",
    performed_by: "Hub Manager – J. Reyes",
  },
  {
    id: 2,
    type: "ALLOCATION_IN",
    resource: "Bottled Water (500ml)",
    category: "Hydration",
    amount: 200,
    unit: "bottles",
    reason: "New delivery from DSWD",
    timestamp: "2025-07-15T11:00:00",
    location: "Northern Samar Hub",
    performed_by: "Logistics – M. Cruz",
  },
  {
    id: 3,
    type: "ALLOCATION_OUT",
    resource: "First Aid Kits",
    category: "Medical",
    amount: 5,
    unit: "kits",
    reason: "Emergency response – Barangay 7",
    timestamp: "2025-07-15T10:30:00",
    location: "Northern Samar Hub",
    performed_by: "Hub Manager – J. Reyes",
  },
  {
    id: 4,
    type: "ALLOCATION_IN",
    resource: "Canned Goods (Assorted)",
    category: "Food",
    amount: 600,
    unit: "cans",
    reason: "Bulk donation from LGU",
    timestamp: "2025-07-15T08:00:00",
    location: "Northern Samar Hub",
    performed_by: "Admin – R. Santos",
  },
  {
    id: 5,
    type: "ALLOCATION_OUT",
    resource: "IV Fluid Sets",
    category: "Medical",
    amount: 10,
    unit: "sets",
    reason: "Deployed to field medical team",
    timestamp: "2025-07-14T17:45:00",
    location: "Northern Samar Hub",
    performed_by: "Medical Officer – Dr. P. Lim",
  },
  {
    id: 6,
    type: "ALLOCATION_IN",
    resource: "Rice Sacks (25kg)",
    category: "Food",
    amount: 100,
    unit: "sacks",
    reason: "Replenishment from provincial warehouse",
    timestamp: "2025-07-14T14:00:00",
    location: "Northern Samar Hub",
    performed_by: "Logistics – M. Cruz",
  },
  {
    id: 7,
    type: "ALLOCATION_OUT",
    resource: "Emergency Blankets",
    category: "Shelter",
    amount: 80,
    unit: "pcs",
    reason: "Distributed to Typhoon Ester victims",
    timestamp: "2025-07-14T09:15:00",
    location: "Northern Samar Hub",
    performed_by: "Hub Manager – J. Reyes",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
};

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const categoryColor = {
  Food: { bg: "#fffbeb", color: "#92400e" },
  Hydration: { bg: "#ebf8ff", color: "#1e40af" },
  Medical: { bg: "#fdf2f8", color: "#9d174d" },
  Shelter: { bg: "#f0fdf4", color: "#166534" },
};

// Group logs by date label
const groupByDate = (logs) => {
  const groups = {};
  logs.forEach((log) => {
    const label = formatDate(log.timestamp);
    if (!groups[label]) groups[label] = [];
    groups[label].push(log);
  });
  return groups;
};

// ─── Component ────────────────────────────────────────────────────────────────
const HubLogs = ({ externalLogs = [] }) => {
  // Merge mock + any logs pushed from ResourceAllocation
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const allLogs = [
    ...externalLogs.map((l) => ({ ...l, performed_by: "Current User" })),
    ...MOCK_LOGS,
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const typeFilters = ["All", "Incoming", "Outgoing"];
  const categoryFilters = ["All", "Food", "Hydration", "Medical", "Shelter"];

  const filtered = allLogs.filter((log) => {
    const matchSearch =
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.performed_by.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType =
      typeFilter === "All" ||
      (typeFilter === "Incoming" && log.type === "ALLOCATION_IN") ||
      (typeFilter === "Outgoing" && log.type === "ALLOCATION_OUT");

    const matchCategory =
      categoryFilter === "All" || log.category === categoryFilter;

    return matchSearch && matchType && matchCategory;
  });

  const grouped = groupByDate(filtered);

  const totalIn = allLogs.filter((l) => l.type === "ALLOCATION_IN").length;
  const totalOut = allLogs.filter((l) => l.type === "ALLOCATION_OUT").length;

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <main className={styles.main}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div>
              <h1 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "6px" }}>
                Hub <span style={{ color: "#38b2ac" }}>Activity Logs</span>
              </h1>
              <p style={{ color: "#718096" }}>
                All allocation changes and resource movements in Northern Samar Hub.
              </p>
            </div>
            <button
              onClick={() => {
                const csv = [
                  ["Timestamp", "Type", "Resource", "Category", "Amount", "Unit", "Reason", "Performed By"],
                  ...allLogs.map((l) => [
                    new Date(l.timestamp).toLocaleString("en-PH"),
                    l.type,
                    l.resource,
                    l.category,
                    l.amount,
                    l.unit,
                    l.reason,
                    l.performed_by,
                  ]),
                ]
                  .map((row) => row.join(","))
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "hub-logs.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className={styles.viewAllBtn}
              style={{
                background: "#38b2ac",
                color: "white",
                border: "none",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </header>

        {/* ── Summary Strip ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>TOTAL EVENTS</p>
              <div className={`${styles.iconCircle} ${styles.teal}`}>
                <ClipboardList size={16} />
              </div>
            </div>
            <h2>{allLogs.length}</h2>
            <span>All logged actions</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>INCOMING</p>
              <div className={`${styles.iconCircle} ${styles.green}`}>
                <ArrowUpCircle size={16} />
              </div>
            </div>
            <h2>{totalIn}</h2>
            <span>Stock additions</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>OUTGOING</p>
              <div className={`${styles.iconCircle} ${styles.orange}`}>
                <ArrowDownCircle size={16} />
              </div>
            </div>
            <h2>{totalOut}</h2>
            <span>Releases & distributions</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>LATEST</p>
              <div className={`${styles.iconCircle} ${styles.blue}`}>
                <Clock size={16} />
              </div>
            </div>
            <h2 style={{ fontSize: "1.2rem" }}>
              {allLogs.length > 0 ? timeAgo(allLogs[0].timestamp) : "—"}
            </h2>
            <span>Most recent activity</span>
          </div>
        </div>

        {/* ── Log Feed ── */}
        <div style={{ marginTop: "2rem" }}>
          <div className={styles.contentCard} style={{ padding: 0 }}>

            {/* Filters Bar */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#a0aec0",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search logs, resources, staff…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 40px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    fontSize: "0.88rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Type filter */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  backgroundColor: "#f1f5f9",
                  padding: "4px",
                  borderRadius: "10px",
                }}
              >
                {typeFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      backgroundColor: typeFilter === f ? "white" : "transparent",
                      color: typeFilter === f ? "#319795" : "#64748b",
                      boxShadow: typeFilter === f ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  backgroundColor: "#f1f5f9",
                  padding: "4px",
                  borderRadius: "10px",
                  flexWrap: "wrap",
                }}
              >
                {categoryFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setCategoryFilter(f)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      backgroundColor: categoryFilter === f ? "white" : "transparent",
                      color: categoryFilter === f ? "#319795" : "#64748b",
                      boxShadow: categoryFilter === f ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Log Entries */}
            <div style={{ padding: "8px 0" }}>
              {Object.keys(grouped).length === 0 ? (
                <div style={{ padding: "60px", textAlign: "center", color: "#a0aec0" }}>
                  <ClipboardList size={40} style={{ marginBottom: "12px", opacity: 0.3 }} />
                  <p style={{ fontWeight: "600" }}>No logs match your filters.</p>
                </div>
              ) : (
                Object.entries(grouped).map(([dateLabel, logs]) => (
                  <div key={dateLabel}>
                    {/* Date Divider */}
                    <div
                      style={{
                        padding: "10px 24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: "700",
                          letterSpacing: "0.1em",
                          color: "#94a3b8",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dateLabel}
                      </span>
                      <div style={{ flex: 1, height: "1px", backgroundColor: "#f1f5f9" }} />
                    </div>

                    {/* Log Items */}
                    {logs.map((log, idx) => {
                      const isIn = log.type === "ALLOCATION_IN";
                      const catStyle = categoryColor[log.category] || { bg: "#f1f5f9", color: "#475569" };

                      return (
                        <div
                          key={log.id}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "16px",
                            padding: "16px 24px",
                            borderBottom: idx < logs.length - 1 ? "1px solid #fafafa" : "none",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#fafffe")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {/* Icon */}
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "12px",
                              backgroundColor: isIn ? "#e6fffa" : "#fff5f5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isIn ? (
                              <ArrowUpCircle size={20} color="#2c7a7b" />
                            ) : (
                              <ArrowDownCircle size={20} color="#c53030" />
                            )}
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                              <span style={{ fontWeight: "700", fontSize: "0.95rem", color: "#1a202c" }}>
                                {log.resource}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: "700",
                                  backgroundColor: catStyle.bg,
                                  color: catStyle.color,
                                  padding: "2px 8px",
                                  borderRadius: "20px",
                                }}
                              >
                                {log.category}
                              </span>
                            </div>
                            <p style={{ fontSize: "0.83rem", color: "#718096", margin: "0 0 6px" }}>
                              {log.reason}
                            </p>
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                                🕐 {formatTime(log.timestamp)}
                              </span>
                              <span style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                                👤 {log.performed_by}
                              </span>
                              <span style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                                📍 {log.location}
                              </span>
                            </div>
                          </div>

                          {/* Amount Badge */}
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: "800",
                                color: isIn ? "#2c7a7b" : "#c53030",
                              }}
                            >
                              {isIn ? "+" : "−"}{log.amount.toLocaleString()}
                            </div>
                            <div style={{ fontSize: "0.72rem", color: "#a0aec0", fontWeight: "600" }}>
                              {log.unit}
                            </div>
                            <div style={{ fontSize: "0.7rem", color: "#cbd5e0", marginTop: "4px" }}>
                              {timeAgo(log.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                Showing {filtered.length} of {allLogs.length} log entries
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HubLogs;