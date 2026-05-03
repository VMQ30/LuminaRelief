import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Filter,
  Package,
  ChevronDown,
  X,
} from "lucide-react";
import styles from "../styles/CompanyDashboard.module.css";

const Inventory = () => {
  const [stockItems, setStockItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    quantity: "",
    capacity: "",
  });

  const filters = ["All", "In Stock", "Low", "Out", "Overstocked"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/inventory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          quantity: parseInt(formData.quantity),
          //TODO: CHANGE THIS TO NOT BE STATIC
          locationId: 1,
          resourceId: 1,
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchInventory();
        setFormData({
          name: "",
          category: "",
          unit: "",
          quantity: "",
          capacity: "",
        });
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "IN_STOCK":
        return { bg: "#f0fff4", color: "#2f855a", dot: "#48bb78" };
      case "LOW_STOCK":
        return { bg: "#fffaf0", color: "#c05621", dot: "#ed8936" };
      case "OUT_OF_STOCK":
        return { bg: "#fff5f5", color: "#c53030", dot: "#f56565" };
      case "OVERSTOCKED":
        return { bg: "#ebf8ff", color: "#2b6cb0", dot: "#4299e1" };
      default:
        return { bg: "#edf2f7", color: "#4a5568", dot: "#a0aec0" };
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/inventory");
      const data = await response.json();
      if (Array.isArray(data)) {
        setStockItems(data);
      } else {
        console.error("Received non-array data:", data);
        setStockItems([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Inventory
              </h1>
              <p style={{ color: "#718096", marginBottom: "0" }}>
                Track and manage resources for your stationary hub.
              </p>
            </div>
            {/* ADD RESOURCE BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.viewAllBtn}
              style={{
                background: "#38b2ac",
                color: "white",
                border: "none",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Plus size={18} /> Add Resource
            </button>
          </div>
        </header>

        <div
          className={styles.dashboardGrid}
          style={{ gridTemplateColumns: "1fr", marginTop: "2rem" }}
        >
          <div className={styles.contentCard} style={{ padding: "0" }}>
            {/* Search and Filters Bar */}
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div
                style={{ position: "relative", flex: "1", minWidth: "300px" }}
              >
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#a0aec0",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search resources, categories..."
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 45px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  backgroundColor: "#f1f5f9",
                  padding: "4px",
                  borderRadius: "10px",
                }}
              >
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "0.2s",
                      backgroundColor:
                        activeFilter === f ? "white" : "transparent",
                      color: activeFilter === f ? "#319795" : "#64748b",
                      boxShadow:
                        activeFilter === f
                          ? "0 2px 4px rgba(0,0,0,0.05)"
                          : "none",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <th style={{ padding: "20px" }}>RESOURCE</th>
                    <th>LOCATION</th>
                    <th style={{ textAlign: "right" }}>QUANTITY</th>
                    <th style={{ paddingLeft: "40px" }}>STATUS</th>
                    <th>UPDATED</th>
                    <th style={{ padding: "20px", textAlign: "center" }}>
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(stockItems) &&
                    stockItems.map((item) => {
                      const style = getStatusStyle(item.status);
                      return (
                        <tr key={item.inventory_id}>
                          {" "}
                          {/* Matches DB primary key */}
                          <td style={{ padding: "20px" }}>
                            <div style={{ fontWeight: "700" }}>
                              {item.resource_name}
                            </div>{" "}
                            {/* Matches query alias */}
                            <div style={{ fontSize: "0.75rem" }}>
                              {item.category}
                            </div>
                          </td>
                          <td>{item.location_name}</td>{" "}
                          {/* Matches query alias */}
                          <td style={{ textAlign: "right" }}>
                            {item.quantity.toLocaleString()}{" "}
                            <span>{item.unit}</span>
                          </td>
                          {/* ... */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: "20px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                Showing 10 of 10 items
              </p>
            </div>
          </div>
        </div>

        {/* MODAL SECTION - This was missing */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Add New Resource</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={styles.closeBtn}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.formGroup}>
                  <label>Resource Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="e.g. Rice Sacks (25kg)"
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      required
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Hydration">Hydration</option>
                      <option value="Medical">Medical</option>
                      <option value="Shelter">Shelter</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Unit</label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      placeholder="e.g. sacks, bottles"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Initial Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      placeholder="0"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Max Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      placeholder="e.g. 1000"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.confirmBtn}>
                    Register Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
