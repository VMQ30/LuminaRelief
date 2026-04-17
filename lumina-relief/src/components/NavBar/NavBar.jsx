import React from "react";
import styles from "./NavBar.module.css";
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
          <button className={styles.loginBtn}>Portal Access</button>
        </div>
      </nav>
      ;
    </>
  );
}

export default NavBar;
