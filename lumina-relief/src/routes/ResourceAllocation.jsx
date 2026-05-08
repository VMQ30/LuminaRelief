import React, { useState , useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  Plus,
  Minus,
  Package,
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import styles from "../styles/CompanyDashboard.module.css";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getStatusConfig = (status) => {
  switch (status) {
    case "IN_STOCK":
      return { bg: "#f0fff4", color: "#2f855a", dot: "#48bb78", label: "In Stock" };
    case "LOW_STOCK":
      return { bg: "#fffaf0", color: "#c05621", dot: "#ed8936", label: "Low Stock" };
    case "OUT_OF_STOCK":
      return { bg: "#fff5f5", color: "#c53030", dot: "#f56565", label: "Out of Stock" };
    case "OVERSTOCKED":
      return { bg: "#ebf8ff", color: "#2b6cb0", dot: "#4299e1", label: "Overstocked" };
    default:
      return { bg: "#edf2f7", color: "#4a5568", dot: "#a0aec0", label: "Unknown" };
  }
};

const deriveStatus = (quantity, capacity) => {
  if (quantity === 0) return "OUT_OF_STOCK";
  const ratio = quantity / capacity;
  if (ratio > 1) return "OVERSTOCKED";
  if (ratio < 0.25) return "LOW_STOCK";
  return "IN_STOCK";
};

const formatTime = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
};

// ─── Component ────────────────────────────────────────────────────────────────
const ResourceAllocation = ({ onLogEntry }) => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(null); // { item, mode: 'add' | 'subtract' }
  const [allocationAmt, setAllocationAmt] = useState("");
  const [reason, setReason] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "In Stock", "Low Stock", "Out of Stock", "Overstocked"];

  const filterMap = {
    All: null,
    "In Stock": "IN_STOCK",
    "Low Stock": "LOW_STOCK",
    "Out of Stock": "OUT_OF_STOCK",
    Overstocked: "OVERSTOCKED",
  };

  const filteredItems = inventory.filter((item) => {
    const matchesFilter = !filterMap[activeFilter] || item.status === filterMap[activeFilter];
    const matchesSearch =
      item.resource_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (item, mode) => {
    setModal({ item, mode });
    setAllocationAmt("");
    setReason("");
  };

  const closeModal = () => {
    setModal(null);
    setAllocationAmt("");
    setReason("");
  };

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/inventory");
      const data = await response.json();
      if (Array.isArray(data)) {
        setInventory(data);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAllocate = async () => {
    const amt = parseInt(allocationAmt);
    if (!amt || amt <= 0) return;
    const itemId = modal.item.inventory_id || modal.item.id;

    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/${modal.item.inventory_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            changeAmount: amt,
            action: modal.mode === "add" ? "ADD" : "SUBTRACT",
          }),
        }
      );

      if (response.ok) {
        // Refresh data from server to get updated quantities and statuses
        await fetchInventory();
        
        if (onLogEntry) {
          onLogEntry({
            id: Date.now(),
            type: modal.mode === "add" ? "ALLOCATION_IN" : "ALLOCATION_OUT",
            resource: modal.item.resource_name,
            category: modal.item.category,
            amount: amt,
            unit: modal.item.unit,
            reason: reason || "No reason provided",
            timestamp: new Date().toISOString(),
            location: modal.item.location_name,
          });
        }
        closeModal();
      } else {
        const err = await response.json();
        alert(err.message || "Failed to update inventory");
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Network error occurred");
    }
  };

  const summaryStats = {
    total: inventory.length,
    inStock: inventory.filter((i) => i.status === "IN_STOCK").length,
    low: inventory.filter((i) => i.status === "LOW_STOCK").length,
    out: inventory.filter((i) => i.status === "OUT_OF_STOCK").length,
  };

  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <main className={styles.main}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "6px" }}>
              Resource <span style={{ color: "#38b2ac" }}>Allocation</span>
            </h1>
            <p style={{ color: "#718096" }}>
              Adjust inventory levels for Northern Samar Hub.
            </p>
          </div>
        </header>

        {/* ── Summary Stats ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>TOTAL RESOURCES</p>
              <div className={`${styles.iconCircle} ${styles.teal}`}>
                <Package size={16} />
              </div>
            </div>
            <h2>{summaryStats.total}</h2>
            <span>Resource types tracked</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>IN STOCK</p>
              <div className={`${styles.iconCircle} ${styles.green}`}>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <h2>{summaryStats.inStock}</h2>
            <span>Ready for dispatch</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>LOW STOCK</p>
              <div className={`${styles.iconCircle} ${styles.orange}`}>
                <TrendingDown size={16} />
              </div>
            </div>
            <h2>{summaryStats.low}</h2>
            <span>Needs restocking soon</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>OUT OF STOCK</p>
              <div className={`${styles.iconCircle} ${styles.blue}`}>
                <AlertTriangle size={16} />
              </div>
            </div>
            <h2>{summaryStats.out}</h2>
            <span>Critical — request resupply</span>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div style={{ marginTop: "2rem" }}>
          <div className={styles.contentCard} style={{ padding: 0 }}>

            {/* Search & Filter Bar */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search resources or categories…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>
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
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      backgroundColor: activeFilter === f ? "white" : "transparent",
                      color: activeFilter === f ? "#319795" : "#64748b",
                      boxShadow: activeFilter === f ? "0 2px 6px rgba(0,0,0,0.07)" : "none",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <th style={{ padding: "14px 24px" }}>RESOURCE</th>
                    <th style={{ padding: "14px 16px" }}>CATEGORY</th>
                    <th style={{ padding: "14px 16px", textAlign: "right" }}>QUANTITY</th>
                    <th style={{ padding: "14px 16px" }}>LEVEL</th>
                    <th style={{ padding: "14px 16px" }}>STATUS</th>
                    <th style={{ padding: "14px 16px" }}>LAST UPDATED</th>
                    <th style={{ padding: "14px 24px", textAlign: "center" }}>ALLOCATE</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#a0aec0" }}>
                        Loading resources...
                      </td>
                    </tr>
                  ) : filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#a0aec0" }}>
                        No resources match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const sc = getStatusConfig(item.status);
                      return (
                        <tr
                          key={item.inventory_id}
                          style={{
                            borderBottom: "1px solid #f8f8f8",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#fafffe")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <td style={{ padding: "18px 24px" }}>
                            <div style={{ fontWeight: "700", color: "#2d3748", fontSize: "0.95rem" }}>
                              {item.resource_name}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                              {item.location_name}
                            </div>
                          </td>

                          <td style={{ padding: "18px 16px" }}>
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                backgroundColor: "#f1f5f9",
                                color: "#475569",
                                padding: "3px 10px",
                                borderRadius: "20px",
                              }}
                            >
                              {item.category}
                            </span>
                          </td>

                          <td style={{ padding: "18px 16px", textAlign: "right", fontWeight: "700", fontSize: "1rem", color: "#2d3748" }}>
                            {item.quantity.toLocaleString()}
                            <span style={{ fontSize: "0.75rem", color: "#a0aec0", fontWeight: "400", marginLeft: "4px" }}>
                              {item.unit}
                            </span>
                          </td>

                          <td style={{ padding: "18px 16px" }}>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                              {item.quantity > 100 ? "High" : item.quantity > 50 ? "Moderate" : "Low"}
                            </span>
                          </td>

                          <td style={{ padding: "18px 16px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.75rem",
                                fontWeight: "700",
                                backgroundColor: sc.bg,
                                color: sc.color,
                                padding: "4px 12px",
                                borderRadius: "20px",
                              }}
                            >
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: sc.dot,
                                  display: "inline-block",
                                }}
                              />
                              {sc.label}
                            </span>
                          </td>

                          <td style={{ padding: "18px 16px", fontSize: "0.82rem", color: "#94a3b8" }}>
                            {formatTime(item.last_updated)}
                          </td>

                          <td style={{ padding: "18px 24px", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                              <button
                                onClick={() => openModal(item, "add")}
                                title="Add stock"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "7px 14px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: "#e6fffa",
                                  color: "#2c7a7b",
                                  fontWeight: "700",
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                }}
                              >
                                <ArrowUpCircle size={14} /> Add
                              </button>
                              <button
                                onClick={() => openModal(item, "subtract")}
                                title="Subtract stock"
                                disabled={item.quantity === 0}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  padding: "7px 14px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: item.quantity === 0 ? "#f7fafc" : "#fff5f5",
                                  color: item.quantity === 0 ? "#cbd5e0" : "#c53030",
                                  fontWeight: "700",
                                  fontSize: "0.8rem",
                                  cursor: item.quantity === 0 ? "not-allowed" : "pointer",
                                  transition: "all 0.15s",
                                }}
                              >
                                <ArrowDownCircle size={14} /> Release
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                Showing {filteredItems.length} of {inventory.length} resources
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Allocation Modal ── */}
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              width: "100%",
              maxWidth: "440px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              animation: "slideUp 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.72rem",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    color: modal.mode === "add" ? "#2c7a7b" : "#c53030",
                    backgroundColor: modal.mode === "add" ? "#e6fffa" : "#fff5f5",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    marginBottom: "8px",
                  }}
                >
                  {modal.mode === "add" ? <Plus size={12} /> : <Minus size={12} />}
                  {modal.mode === "add" ? "ADD STOCK" : "RELEASE STOCK"}
                </div>
                <h3 style={{ fontWeight: "800", fontSize: "1.2rem", color: "#1a202c", marginBottom: "4px" }}>
                  {modal.item.resource_name}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#a0aec0" }}>
                  Current stock: <strong style={{ color: "#2d3748" }}>{modal.item.quantity.toLocaleString()} {modal.item.unit}</strong>
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#4a5568", marginBottom: "8px" }}>
                AMOUNT ({modal.item.unit})
              </label>
              <input
                type="number"
                min="1"
                max={modal.mode === "subtract" ? modal.item.quantity : undefined}
                value={allocationAmt}
                onChange={(e) => setAllocationAmt(e.target.value)}
                placeholder={`Enter quantity in ${modal.item.unit}…`}
                autoFocus
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#4a5568", marginBottom: "8px" }}>
                REASON <span style={{ color: "#a0aec0", fontWeight: "400" }}>(optional)</span>
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={modal.mode === "add" ? "e.g. New delivery arrived" : "e.g. Distributed to evacuees"}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={closeModal}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  backgroundColor: "white",
                  color: "#64748b",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAllocate}
                disabled={!allocationAmt || parseInt(allocationAmt) <= 0}
                style={{
                  flex: 2,
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor:
                    !allocationAmt || parseInt(allocationAmt) <= 0
                      ? "#e2e8f0"
                      : modal.mode === "add"
                      ? "#38b2ac"
                      : "#e53e3e",
                  color: !allocationAmt || parseInt(allocationAmt) <= 0 ? "#a0aec0" : "white",
                  fontWeight: "700",
                  cursor: !allocationAmt || parseInt(allocationAmt) <= 0 ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {modal.mode === "add" ? <Plus size={16} /> : <Minus size={16} />}
                {modal.mode === "add" ? "Confirm Add" : "Confirm Release"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResourceAllocation;