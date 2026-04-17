import React from "react";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Database,
  ClipboardList,
  Bell,
  Truck,
  Activity,
  Info,
  LogOut,
} from "lucide-react";
import styles from "../styles/AdminDashboard.module.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";

// Mock data for the chart
const impactData = [
  { name: "Mon", dist: 400 },
  { name: "Tue", dist: 300 },
  { name: "Wed", dist: 600 },
  { name: "Thu", dist: 800 },
  { name: "Fri", dist: 500 },
  { name: "Sat", dist: 900 },
  { name: "Sun", dist: 700 },
];
const AdminDashboard = () => {
  return (
    <div className={styles.wrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>L</div>
            <div className={styles.brandText}>
              <div className={styles.brandName}>
                LUMINA<span>RELIEF</span>
              </div>
              <div className={styles.brandSub}>Operations Portal</div>
            </div>
          </div>

          <nav className={styles.navigation}>
            <p className={styles.sectionLabel}>Navigation</p>
            <a href="#" className={styles.navItemActive}>
              <LayoutDashboard size={20} /> Dashboard
            </a>
            <a href="#" className={styles.navItem}>
              <Package size={20} /> Inventory
            </a>
            <a href="#" className={styles.navItem}>
              <MapPin size={20} /> Locations
            </a>
            <a href="#" className={styles.navItem}>
              <Database size={20} /> Resources
            </a>
            <a href="#" className={styles.navItem}>
              <ClipboardList size={20} /> Audit Logs
            </a>
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.userProfile}>
            <div className={styles.avatarCircle}>AA</div>
            <div className={styles.userMeta}>
              <p className={styles.profileName}>Ava Admin</p>
              <span className={styles.roleBadge}>ADMIN</span>
            </div>
            <Link to="/" className={styles.logoutIcon}>
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>
            Welcome back, <span>Ava</span>
          </h1>
          <p>Here's what's happening across the network today.</p>
        </header>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>TOTAL RESOURCES</p>
              <div className={`${styles.iconCircle} ${styles.teal}`}>
                <Activity size={16} />
              </div>
            </div>
            <h2>9,665</h2>
            <span>units across all hubs</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>LOW STOCK ALERTS</p>
              <div className={`${styles.iconCircle} ${styles.orange}`}>
                <Bell size={16} />
              </div>
            </div>
            <h2>4</h2>
            <span>items need restocking</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>PENDING DISPATCHES</p>
              <div className={`${styles.iconCircle} ${styles.blue}`}>
                <Truck size={16} />
              </div>
            </div>
            <h2>3</h2>
            <span>en route to field hubs</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>ACTIVE LOCATIONS</p>
              <div className={`${styles.iconCircle} ${styles.green}`}>
                <MapPin size={16} />
              </div>
            </div>
            <h2>3</h2>
            <span>of 4 total</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.dashboardGridWrapper}>
          <div className={styles.dashboardGrid}>
            {/* Critical Stock List */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h3>Critical Stock</h3>
                <span className={styles.alertHeader}>4 alerts</span>
              </div>
              <div className={styles.stockList}>
                <div className={styles.stockItem}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>Rice Sacks (25kg)</p>
                    <p className={styles.itemLoc}>
                      Northern Samar Hub • 80 sacks
                    </p>
                  </div>
                  <span className={`${styles.statusBadge} ${styles.lowStock}`}>
                    <span className={styles.dot}>●</span> LOW STOCK
                  </span>
                </div>

                <div className={styles.stockItem}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>Emergency Blankets</p>
                    <p className={styles.itemLoc}>
                      Northern Samar Hub • 0 units
                    </p>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${styles.outOfStock}`}
                  >
                    <span className={styles.dot}>●</span> OUT OF STOCK
                  </span>
                </div>
                {/* ... other items */}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.contentCard}>
              <h3>Recent Activity</h3>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div
                    className={`${styles.activityDot} ${styles.dotTeal}`}
                  ></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>
                      <strong>Ava Admin</strong> · add
                    </p>
                    <span className={styles.activitySub}>
                      Bottled Water (1.5L) @ Northern Samar Hub
                    </span>
                  </div>
                  <span className={styles.activityTime}>1h ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3>Active Dispatches</h3>
              <span className={styles.alertHeader}>3 in transit</span>
            </div>

            <div className={styles.shipmentList}>
              {/* Shipment 1 */}
              <div className={styles.shipmentItem}>
                <div className={styles.shipmentTop}>
                  <div className={styles.shipmentId}>
                    <Truck size={16} className={styles.iconTeal} />
                    <strong>TRK-8802</strong>
                  </div>
                  <span className={styles.etaText}>ETA: 2h 15m</span>
                </div>
                <p className={styles.shipmentDest}>to Tacloban Relief Center</p>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              {/* Shipment 2 */}
              <div className={styles.shipmentItem}>
                <div className={styles.shipmentTop}>
                  <div className={styles.shipmentId}>
                    <Truck size={16} className={styles.iconTeal} />
                    <strong>TRK-9124</strong>
                  </div>
                  <span className={styles.etaText}>ETA: 45m</span>
                </div>
                <p className={styles.shipmentDest}>to Northern Samar Hub</p>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dashboardGrid}>
            {/* Existing Critical Stock Card... */}

            {/* NEW: Distribution Impact Chart */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h3>Distribution Impact</h3>
                <span className={styles.alertHeader}>Weekly Supplies Out</span>
              </div>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={impactData}>
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
                    <Line
                      type="monotone"
                      dataKey="dist"
                      stroke="#38b2ac"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#38b2ac" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* NEW: Active Dispatches Timeline */}
            <div className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <h3>Active Dispatches</h3>
                <span className={styles.alertHeader}>3 Live Tracking</span>
              </div>
              <div className={styles.shipmentList}>
                <div className={styles.shipmentItem}>
                  <div className={styles.shipmentMeta}>
                    <span className={styles.truckId}>TRK-8802</span>
                    <span className={styles.etaText}>ETA: 2h 15m</span>
                  </div>
                  <p className={styles.destination}>to Davao Forward Base</p>
                  <div className={styles.progressContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className={styles.shipmentItem}>
                  <div className={styles.shipmentMeta}>
                    <span className={styles.truckId}>TRK-9124</span>
                    <span className={styles.etaText}>ETA: 45m</span>
                  </div>
                  <p className={styles.destination}>
                    to Tacloban Relief Center
                  </p>
                  <div className={styles.progressContainer}>
                    <div
                      className={styles.progressBar}
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
