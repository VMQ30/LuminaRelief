import React, { useState } from "react";
import { ShieldCheck, Building2, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../styles/SignIn.module.css";

const SignUp = () => {
  const [accountType, setAccountType] = useState("company");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error("Signup Error: ", e);
    }
  };
  return (
    <div className={styles.signInWrapper}>
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
            <ShieldCheck size={28} className={styles.iconTeal} />
          </div>
          <h2>
            Join the{" "}
            <span className={styles.heartText}>network of relief.</span>
          </h2>
          <p>
            {accountType === "company"
              ? "Onboard your organization to manage multiple hubs and strategic dispatches."
              : "Create a personal profile to join an existing organization's relief efforts."}
          </p>
        </div>
        <div className={styles.footerInfo}>© 2026 LuminaRelief Project</div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          <header className={styles.formHeader}>
            <h1>Create an account</h1>
            <p>Select how you want to use the portal.</p>
          </header>

          <div className={styles.toggleWrapper}>
            <button
              className={
                accountType === "company"
                  ? styles.activeToggle
                  : styles.inactiveToggle
              }
              onClick={() => setAccountType("company")}
            >
              <Building2 size={16} /> Company
            </button>
            <button
              className={
                accountType === "user"
                  ? styles.activeToggle
                  : styles.inactiveToggle
              }
              onClick={() => setAccountType("user")}
            >
              <User size={16} /> Individual
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {accountType === "company" && (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="orgName">Organization Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g. Red Cross Chapter"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Company Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="company@organization.org"
                    required
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {accountType === "user" && (
              <>
                <div className={styles.inputGroup}>
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Jane Doe"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="jane@organization.org"
                    required
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Min. 8 characters"
                required
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                placeholder="+63 XXX-XXX-XXXX"
                required
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.primaryBtn}>
              Register as {accountType === "company" ? "Organization" : "User"}
            </button>
          </form>

          <p className={styles.switchAuth}>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
