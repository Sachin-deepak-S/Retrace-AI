import React from "react";
import { Link } from "react-router-dom";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-card">
        <h1>Terms & Conditions — Retrace AI</h1>
        <p className="date">Last Updated: October 11, 2025</p>

        <section>
          <p>
            Welcome to <strong>Retrace AI</strong> (“the App”, “we”, “our”, or “us”). Retrace AI is a personal project created and maintained by{" "}
            <strong>Sachin Deepak S</strong>. By using this App, you agree to the following Terms & Conditions (“Terms”). Please read them carefully
            before proceeding.
          </p>
        </section>

        <section>
          <h2>1. About Retrace AI</h2>
          <p>Retrace AI is an AI-based tool that analyzes videos and photos to:</p>
          <ul>
            <li>Identify edits, filters, or visual effects used</li>
            <li>Detect whether a video or image contains AI-generated elements</li>
            <li>Provide insights into the possible original content</li>
          </ul>
          <p>The App is intended for educational, testing, and research purposes only, and not for commercial or legal use.</p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old to use Retrace AI.</li>
            <li>If you are under 18, you must use it under the supervision of a parent or guardian.</li>
            <li>You must only upload media that you own or have permission to analyze.</li>
          </ul>
        </section>

        <section>
          <h2>3. Account Registration</h2>
          <ul>
            <li>Each user must register with a verified email and mobile number.</li>
            <li>Only one account per person is allowed.</li>
            <li>Authentication is performed via OTP and/or email verification.</li>
            <li>You are responsible for safeguarding your login credentials.</li>
          </ul>
        </section>

        <section>
          <h2>4. Uploads & Content Rights</h2>
          <ul>
            <li>You retain ownership of all videos and images you upload.</li>
            <li>
              By uploading, you grant Retrace AI permission to temporarily store, process, and analyze your media, and to generate reports and
              results from that analysis.
            </li>
            <li>Uploaded content will not be shared, reused, or made public.</li>
            <li>All data is used only for processing your request and improving app functionality.</li>
          </ul>
        </section>

        <section>
          <h2>5. Media Access Permissions</h2>
          <ul>
            <li>The app will ask for permission before accessing your device’s media files.</li>
            <li>It will only access files you manually select for analysis.</li>
            <li>You can revoke permissions anytime through your device settings.</li>
          </ul>
        </section>

        <section>
          <h2>6. AI Analysis Results</h2>
          <p>
            Retrace AI uses machine learning and forensic tools to detect edits, AI-generated elements, and metadata inconsistencies. Results are
            automatically generated predictions and may not be 100% accurate. The analysis is intended as a technical insight, not definitive
            evidence.
          </p>
        </section>

        <section>
          <h2>7. Sensitive or Vulnerable Media</h2>
          <p>
            If Retrace AI detects highly altered or potentially harmful media, analysis may pause, and you may be asked to confirm ownership or
            intent before continuing.
          </p>
        </section>

        <section>
          <h2>8. Acceptable Use Policy</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Upload copyrighted or private content without permission.</li>
            <li>Use the App for illegal, unethical, or privacy-invading activities.</li>
            <li>Attempt to hack, reverse-engineer, or misuse the App or its AI models.</li>
            <li>Upload or analyze sensitive material without consent from the content owner.</li>
          </ul>
          <p>Violating this policy may result in account suspension or permanent blocking.</p>
        </section>

        <section>
          <h2>9. Privacy & Data Protection</h2>
          <ul>
            <li>Your personal data (email, phone number, uploaded media) is kept confidential.</li>
            <li>Uploaded files are automatically deleted after processing.</li>
            <li>Data is stored securely and never shared with third parties.</li>
            <li>No external tracking, advertising, or analytics tools are used.</li>
          </ul>
        </section>

        <section>
          <h2>10. Intellectual Property</h2>
          <p>
            All source code, models, designs, and interfaces of Retrace AI are the property of <strong>Sachin Deepak S</strong>. “Retrace AI” and its
            branding belong exclusively to the creator.
          </p>
        </section>

        <section>
          <h2>11. Disclaimer & Limitation of Liability</h2>
          <p>
            Retrace AI is provided on an “as-is” and “as-available” basis. No guarantees are made regarding accuracy, reliability, or availability.
            The creator is not responsible for any data loss, damage, or misuse arising from use of the App.
          </p>
        </section>

        <section>
          <h2>12. Termination</h2>
          <p>
            You may stop using the App or delete your account anytime. The creator reserves the right to suspend or terminate access if terms are
            violated or misuse is detected.
          </p>
        </section>

        <section>
          <h2>13. Updates to Terms</h2>
          <p>These Terms may be updated periodically. Continued use of the App means you agree to the updated Terms.</p>
        </section>

        <section>
          <h2>14. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be handled in accordance with applicable Indian law.</p>
        </section>

        <section>
          <h2>15. Contact Information</h2>
          <p>
            For questions, feedback, or concerns: <br />
            📧 <strong>sachindeepak4181@gmail.com</strong> <br />
            👤 Developer: <strong>Sachin Deepak S</strong>
          </p>
        </section>

        {/* 🔙 Back Button */}
        <div className="back-section">
          <Link to="/" className="back-btn">
            ← Back to Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
