import { pageMetadata } from "@/lib/metadata";
import styles from "./privacy.module.css";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Kriya: Spiritual Productivity.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <h1>Privacy Policy for Kriya: Spiritual Productivity</h1>
        <p className={styles.effectiveDate}>Effective Date: March 2026</p>
        <p>Kriya: Spiritual Productivity (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy.</p>

        <h2>1. Information We Collect</h2>
        <p>We do not collect, store, or share any personal or sensitive user data.</p>
        <ul><li>No login or account creation is required</li><li>No personal information is collected</li><li>No analytics or tracking tools are used</li></ul>

        <h2>2. Data Stored on Device</h2>
        <p>Any data you enter into the app (such as tasks or preferences) is stored locally on your device only and is not transmitted to any servers.</p>
        <h2>3. Internet Usage</h2>
        <p>The app may use internet connectivity only for basic functionality, but it does not collect or transmit user data.</p>
        <h2>4. Third-Party Services</h2>
        <p>Kriya does not use any third-party services (such as Firebase, analytics tools, or advertising SDKs) that collect user data.</p>
        <h2>5. Data Sharing</h2>
        <p>We do not share any user data with any third parties.</p>
        <h2>6. Children&apos;s Privacy</h2>
        <p>This app does not knowingly collect any data from children or any users.</p>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy in the future. Any changes will be reflected on this page.</p>
        <h2>8. Contact Us</h2>
        <p>Email: bitwisedharma@gmail.com</p>
      </article>
    </main>
  );
}
