import React from "react";
import styles from "../styles/NavBar.module.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          LUMINA<span>RELIEF</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#mission">Our Mission</a>
          <a href="#logistics">Logistics</a>
          <Link to="/login" className={styles.portalBtn}>
            Portal Access
          </Link>
        </div>
      </nav>
      ;
    </>
  );
}

export default NavBar;
