import React from "react";
import {
  Eye,
  ShieldCheck,
  Map,
  Package,
  Truck,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import styles from "../styles/LandingPage.module.css";
import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              Clarity in the <span>Heart of Crisis.</span>
            </h1>
            <p>
              Real-time inventory management and logistics for disaster
              response. Ensuring every resource reaches the hands that need it
              most.
            </p>
            <div className={styles.ctaGroup}>
              <Link to="/login" className={styles.primaryBtn}>
                Get Started
              </Link>
              <button className={styles.secondaryBtn}>View Live Map</button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageCard}>
              <div className={styles.cardHeader}>Live Dispatch</div>
              <div className={styles.cardStat}>Essential Supplies</div>
              <div className={styles.cardStatus}>En Route</div>
              <div className={styles.cardLoc}>Northern Samar Hub</div>
            </div>
          </div>
        </header>

        <section id="mission" className={styles.missionSection}>
          <div className={styles.missionHeader}>
            <h4>OUR MISSION</h4>
            <h2>Built for When It Matters Most</h2>
            <p>
              Every feature is designed to bring speed, transparency, and trust
              to humanitarian operations.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <Eye size={24} strokeWidth={1.5} />
              </div>
              <h3>Total Visibility</h3>
              <p>
                Eliminate dark spots in your supply chain with end-to-end
                resource tracking across every checkpoint.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <h3>Verified Trust</h3>
              <p>
                Automated audit trails ensure every donation is accounted for
                and handled with complete integrity.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconBox}>
                <Map size={24} strokeWidth={1.5} />
              </div>
              <h3>Strategic Response</h3>
              <p>
                Identify high-need zones instantly through our integrated
                regional mapping and AI-powered analytics.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.statusBanner}>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Network Status:</span>
              <h3>OPERATIONAL</h3>
              <p>Active Response Clusters</p>
            </div>

            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Inventory Integrity:</span>
              <h3>VERIFIED</h3>
              <p>Cryptographic Ledger Audit</p>
            </div>

            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Logistics Efficiency:</span>
              <h3>OPTIMIZED</h3>
              <p>Direct Distribution Routes</p>
            </div>

            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Resource Reach:</span>
              <h3>GLOBAL</h3>
              <p>Strategic Supply Points</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.processSection}>
          <div className={styles.processHeader}>
            <h4>PROCESS</h4>
            <h2>How LuminaRelief Works</h2>
            <p>
              From donation to delivery, every step is tracked, verified, and
              reported.
            </p>
          </div>

          <div className={styles.processGrid}>
            {/* Step 01 */}
            <div className={styles.processStep}>
              <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>01</span>
                <div className={styles.stepIcon}>
                  <Package size={24} />
                </div>
              </div>
              <h3>Register Resources</h3>
              <p>
                Log incoming donations and supplies with full metadata and
                photos.
              </p>
            </div>

            {/* Step 02 */}
            <div className={styles.processStep}>
              <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>02</span>
                <div className={styles.stepIcon}>
                  <Truck size={24} />
                </div>
              </div>
              <h3>Route & Dispatch</h3>
              <p>
                AI-optimized routing ensures the fastest path to affected
                communities.
              </p>
            </div>

            {/* Step 03 */}
            <div className={styles.processStep}>
              <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>03</span>
                <div className={styles.stepIcon}>
                  <CheckCircle size={24} />
                </div>
              </div>
              <h3>Verify Delivery</h3>
              <p>
                On-ground verification with GPS stamps and recipient
                confirmation.
              </p>
            </div>

            {/* Step 04 */}
            <div className={styles.processStep}>
              <div className={styles.stepIconWrapper}>
                <span className={styles.stepNumber}>04</span>
                <div className={styles.stepIcon}>
                  <BarChart3 size={24} />
                </div>
              </div>
              <h3>Report & Analyze</h3>
              <p>
                Real-time dashboards give stakeholders full transparency on
                impact.
              </p>
            </div>
          </div>
        </section>

        {/* Add this above your <footer className={styles.footer}> */}
        <section className={styles.finalCtaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Bring Clarity to Your Response?</h2>
            <p>
              Join hundreds of organizations using LuminaRelief to save time,
              build trust, and deliver impact where it's needed most.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.trialBtn}>Start Free Trial</button>
              <button className={styles.demoBtn}>Schedule a Demo</button>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <p>
            &copy; 2026 LuminaRelief Project. Empowering Resilient Communities.
          </p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
