import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResultsPage.css";
// ResultsPage styles - no Dashboard.css import needed

const ResultsPage = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get analysis result from localStorage (set by Dashboard)
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      try {
        setAnalysisData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse analysis result:", e);
      }
    }
    setLoading(false);

    // Redirect if no token
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-screen">Loading results...</div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="results-container">
        <div className="loading-screen">
          <p>No analysis data found.</p>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { authenticity, metadata, enhancements, raw } = analysisData;

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="results-layout">
        {/* Left: Preview Box */}
        <div className="results-preview-box">
          <h3>File Preview</h3>
          {metadata?.filename && (
            <div>
              <p><strong>File:</strong> {metadata.filename}</p>
              <p><strong>Size:</strong> {(metadata.size / 1024 / 1024).toFixed(2)} MB</p>
              <p><strong>Type:</strong> {metadata.type}</p>
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div className="results-details">
          {/* Authenticity Card */}
          <div className="result-card">
            <h3>Authenticity Analysis</h3>
            <p>
              <strong>AI Generated:</strong>{" "}
              <span className={authenticity?.ai_generated ? "danger" : "safe"}>
                {authenticity?.ai_generated ? "⚠️ Detected" : "✅ Not Detected"}
              </span>
            </p>
            <p>
              <strong>Tampering:</strong>{" "}
              <span className={authenticity?.tampering ? "danger" : "safe"}>
                {authenticity?.tampering ? "⚠️ Detected" : "✅ Not Detected"}
              </span>
            </p>
          </div>

          {/* Metadata Card */}
          {metadata && (
            <div className="result-card">
              <h3>File Metadata</h3>
              <ul>
                <li><strong>Filename:</strong> {metadata.filename}</li>
                <li><strong>Extension:</strong> {metadata.extension}</li>
                <li><strong>Size:</strong> {(metadata.size / 1024 / 1024).toFixed(2)} MB</li>
                {metadata.created && (
                  <li><strong>Created:</strong> {new Date(metadata.created).toLocaleString()}</li>
                )}
                {metadata.modified && (
                  <li><strong>Modified:</strong> {new Date(metadata.modified).toLocaleString()}</li>
                )}
              </ul>
            </div>
          )}

          {/* Enhancements Card */}
          {enhancements && enhancements.length > 0 && (
            <div className="result-card">
              <h3>Detected Enhancements</h3>
              <ul>
                {enhancements.map((enh, i) => (
                  <li key={i}>{enh}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw Data Card */}
          {raw && (
            <div className="result-card">
              <h3>Raw Analysis Data</h3>
              <pre style={{ fontSize: "12px", overflow: "auto", maxHeight: "300px" }}>
                {JSON.stringify(raw, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="results-footer">
        <p>Analysis completed at {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ResultsPage;
