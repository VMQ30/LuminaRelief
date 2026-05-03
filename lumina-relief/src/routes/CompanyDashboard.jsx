import React from "react";
import { CheckCircle2, Activity, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar"; // Import the new component
import styles from "../styles/CompanyDashboard.module.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const hubActivityData = [
  { name: "8AM", units: 45 },
  { name: "10AM", units: 180 },
  { name: "12PM", units: 320 },
  { name: "2PM", units: 210 },
  { name: "4PM", units: 150 },
  { name: "6PM", units: 60 },
];

const CompanyDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>
            Hub Overview: <span>Northern Samar</span>
          </h1>
          <p>Local inventory monitoring and fulfillment tracking.</p>
        </header>

        {/* Localized Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>FULFILLED TODAY</p>
              <div className={`${styles.iconCircle} ${styles.teal}`}>
                <CheckCircle2 size={16} />
              </div>
            </div>
            <h2>965</h2>
            <span>Units logged & released</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>STOCK DEPLETION</p>
              <div className={`${styles.iconCircle} ${styles.orange}`}>
                <Activity size={16} />
              </div>
            </div>
            <h2>14%</h2>
            <span>Drop since last delivery</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>HUB STATUS</p>
              <div className={`${styles.iconCircle} ${styles.blue}`}>
                <AlertTriangle size={16} />
              </div>
            </div>
            <h2>ACTIVE</h2>
            <span>Stationary pickup in progress</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>DEMAND FORECAST</p>
              <div className={`${styles.iconCircle} ${styles.green}`}>
                <AlertTriangle size={16} />
              </div>
            </div>
            <h2>STABLE</h2>
            <span>No active disaster alerts</span>
          </div>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Output Traffic Chart */}
          <div className={`${styles.contentCard} ${styles.spanTwo}`}>
            <div className={styles.cardHeader}>
              <h3>Hourly Output Volume</h3>
              <span className={styles.alertHeader}>Items Distributed</span>
            </div>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={hubActivityData}>
                  <defs>
                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#a0aec0" }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="units"
                    stroke="#38b2ac"
                    fillOpacity={1}
                    fill="url(#colorUnits)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Local Stock Alerts */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3>Hub Stock Alerts</h3>
              <span className={styles.alertHeader}>Refill Needed</span>
            </div>
            <div className={styles.stockList}>
              <div className={styles.stockItem}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>Rice Sacks (25kg)</p>
                  <p className={styles.itemLoc}>80 sacks left</p>
                </div>
                <span className={`${styles.statusBadge} ${styles.lowStock}`}>
                  CRITICAL
                </span>
              </div>
              <div className={styles.stockItem}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>First Aid Kits</p>
                  <p className={styles.itemLoc}>12 kits left</p>
                </div>
                <span className={`${styles.statusBadge} ${styles.lowStock}`}>
                  LOW
                </span>
              </div>
            </div>
          </div>

          {/* Hub Activity Log */}
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3>Onsite Activity</h3>
              <button className={styles.viewAllBtn}>Logs</button>
            </div>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div
                  className={`${styles.activityDot} ${styles.dotTeal}`}
                ></div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>Inventory Dispatched</p>
                  <span className={styles.activitySub}>
                    50 Rice Sacks released
                  </span>
                </div>
                <span className={styles.activityTime}>12m ago</span>
              </div>
              <div className={styles.activityItem}>
                <div
                  className={`${styles.activityDot} ${styles.dotOrange}`}
                ></div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>New Delivery Logged</p>
                  <span className={styles.activitySub}>+200 Water Units</span>
                </div>
                <span className={styles.activityTime}>1h ago</span>
              </div>
            </div>
          </div>

          {/* Current Stock Availability */}
          <div className={`${styles.contentCard} ${styles.spanTwo}`}>
            <div className={styles.cardHeader}>
              <h3>Current Stock Availability</h3>
              <span className={styles.alertHeader}>Status per Category</span>
            </div>
            <div className={styles.shipmentList}>
              <div className={styles.shipmentItem}>
                <div className={styles.shipmentMeta}>
                  <span className={styles.truckId}>Food & Grains</span>
                  <span className={styles.etaText}>IN STOCK</span>
                </div>
                <p className={styles.destination}>
                  Available for immediate pickup
                </p>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
              <div className={styles.shipmentItem}>
                <div className={styles.shipmentMeta}>
                  <span className={styles.truckId}>Medical Supplies</span>
                  <span className={styles.etaText}>LIMITED</span>
                </div>
                <p className={styles.destination}>
                  Prioritizing emergency cases
                </p>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "25%", backgroundColor: "#ed8936" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
