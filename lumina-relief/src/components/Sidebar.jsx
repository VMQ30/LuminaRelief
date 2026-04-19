import React from "react";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Database,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/CompanyDashboard.module.css";

const Sidebar = () => {
  const location = useLocation();

  // Helper to determine active class
  const isActive = (path) =>
    location.pathname === path ? styles.navItemActive : styles.navItem;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>L</div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>
              LUMINA<span>RELIEF</span>
            </div>
            <div className={styles.brandSub}>Hub Manager Portal</div>
          </div>
        </div>

        <nav className={styles.navigation}>
          <p className={styles.sectionLabel}>Hub Management</p>
          <Link to="/portal" className={isActive("/portal")}>
            <LayoutDashboard size={20} /> Hub Overview
          </Link>
          <Link to="/inventory" className={isActive("/inventory")}>
            <Package size={20} /> Local Stock
          </Link>
          <Link to="/resources" className={isActive("/resources")}>
            <Database size={20} /> Resource Allocation
          </Link>
          <Link to="/audit" className={isActive("/audit")}>
            <ClipboardList size={20} /> Hub Logs
          </Link>
        </nav>
      </div>

      <div className={styles.sidebarBottom}>
        <div className={styles.userProfile}>
          <div className={styles.avatarCircle}>NS</div>
          <div className={styles.userMeta}>
            <p className={styles.profileName}>Sam Samar</p>
            <span className={styles.roleBadge}>NORTH SAMAR HUB</span>
          </div>
          <Link to="/" className={styles.logoutIcon}>
            <LogOut size={18} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
