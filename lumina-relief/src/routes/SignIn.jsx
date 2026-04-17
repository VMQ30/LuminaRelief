import React from "react";
import { Sparkles, ArrowRight, UserCircle } from "lucide-react";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.signInWrapper}>
      {/* Left Column: Brand Section */}
      <div className={styles.brandSide}>
        <div className={styles.ombreGlow}></div>
        <div className={styles.topInfo}>
          <div className={styles.brandName}>
            LUMINA<span>RELIEF</span>
          </div>
          <div className={styles.brandSub}>Operations & Logistics Portal</div>
        </div>

        <div className={styles.brandMotto}>
          <div className={styles.iconCircle}>
            <Sparkles size={50} className={styles.iconTeal} />
          </div>
          <h2>
            Clarity in the{" "}
            <span className={styles.heartText}>heart of crisis.</span>
          </h2>
          <p>
            Real-time inventory across every relief hub. Verified audit trails.
            Strategic dispatch.
          </p>
        </div>

        <div className={styles.footerInfo}>© 2026 LuminaRelief Project</div>
      </div>

      {/* Right Column: Form Section */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <header className={styles.formHeader}>
            <div className={styles.portalPill}>
              <UserCircle size={16} /> Portal Access
            </div>
            <h1>Sign in to continue</h1>
            <p>Use your organization credentials.</p>
          </header>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@lumina.org"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Access Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
