import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [details, setDetails] = useState({});
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [nsfwResult, setNsfwResult] = useState(null);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Redirect if no token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  /* --------------------- FILE HANDLING --------------------- */

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime", "video/x-msvideo"];
    if (!allowedTypes.includes(selectedFile.type)) {
      return alert("Unsupported file type!");
    }

    // Validate size
    if (selectedFile.size > 200 * 1024 * 1024) {
      return alert("File too large (Max: 200MB)");
    }

    setFile(selectedFile);
    generatePreview(selectedFile);
    extractDetails(selectedFile);
    setNsfwResult(null);
    setStatus("");
  };

  const generatePreview = (file) => {
    setPreview(URL.createObjectURL(file));
  };

  const extractDetails = (file) => {
    setDetails({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      format: file.name.split(".").pop().toUpperCase(),
    });
  };

  /* --------------------- MAIN ANALYSIS --------------------- */

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setStatus("🔍 Checking NSFW safety...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      /* ------------------ STEP 1: NSFW CHECK ------------------ */
      const safety = await axios.post(
        "http://localhost:5000/api/analyze/safety",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const nsfwData = safety.data?.nsfw_analysis;
      setNsfwResult(nsfwData);

      if (nsfwData?.is_nsfw) {
        setStatus("🚫 NSFW content detected — stopped.");
        return;
      }

      setStatus("✅ Safe! Running full analysis...");
      setProgress(10);

      /* ----------------- STEP 2: FULL ANALYSIS ---------------- */
      const full = await axios.post(
        "http://localhost:5000/api/analyze/full",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (p) =>
            setProgress(Math.round((p.loaded * 100) / p.total)),
        }
      );

      setStatus("🎉 Analysis complete!");

      // Save data for Results Page
      localStorage.setItem("analysisResult", JSON.stringify(full.data));

      // Add upload history
      setUploadHistory((prev) => [
        { name: file.name, date: new Date().toLocaleString() },
        ...prev.slice(0, 4),
      ]);

      // Go to results page
      navigate("/results");

    } catch (err) {
      console.error(err);
      setStatus("❌ Analysis failed! Try again.");
    }
  };

  /* --------------------- LOGOUT --------------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
  };

  /* ----------------------- UI ----------------------- */

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header className="dashboard-header">
        <div className="logo-section">
          <img src="/logo.png" alt="ReTrace AI" className="app-logo" />
          <h2>ReTrace AI</h2>
        </div>

        <nav className="nav-links">
          <span>Upload</span>
          <span>Reports</span>
          <span>Profile</span>
        </nav>

        <div className="user-menu">
          <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
            👤
          </div>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button onClick={handleLogout}>Logout</button>
                <button>Settings</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Upload Section */}
      <main className="upload-section">
        <div className="upload-card">

          {/* Dropzone */}
          <label
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelect({ target: { files: e.dataTransfer.files } });
            }}
          >
            <p>📁 Drag & Drop or Click to Browse</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              hidden
            />
            <button className="browse-btn" onClick={() => fileInputRef.current.click()}>
              Browse Files
            </button>
          </label>

          {/* Preview */}
          {preview && (
            <div className="preview-section">
              {file.type.startsWith("video") ? (
                <video src={preview} width="300" height="200" controls loop muted />
              ) : (
                <img src={preview} width="240" alt="preview" />
              )}

              <div className="file-details">
                <p><b>Name:</b> {details.name}</p>
                <p><b>Size:</b> {details.size}</p>
                <p><b>Format:</b> {details.format}</p>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button className="analyze-btn" disabled={!file} onClick={handleUpload}>
            Start Analysis →
          </button>

          {/* Progress */}
          {progress > 0 && (
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }}>{progress}%</div>
            </div>
          )}

          {/* Status */}
          {status && <p className="status-text">{status}</p>}

          {/* NSFW Result Block */}
          {nsfwResult && (
            <div className={`nsfw-result ${nsfwResult.is_nsfw ? "alert-danger" : "alert-safe"}`}>
              <h4>NSFW Safety Result</h4>
              <p>
                {nsfwResult.is_nsfw ? "🚫 NSFW Detected" : "✅ Safe Content"}
              </p>
              <p>Confidence: {(nsfwResult.nsfw_confidence * 100).toFixed(1)}%</p>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Upload History</h3>
          <ul>
            {uploadHistory.length === 0 ? (
              <li>No uploads yet</li>
            ) : (
              uploadHistory.map((u, i) => (
                <li key={i}>
                  <strong>{u.name}</strong>
                  <span>{u.date}</span>
                </li>
              ))
            )}
          </ul>

          <div className="tips-section">
            <h4>Tips</h4>
            <ul>
              <li>Use high-resolution files</li>
              <li>Max size: 200MB</li>
              <li>Supported: JPG, PNG, MP4</li>
            </ul>
          </div>
        </aside>
      </main>

    </div>
  );
};

export default Dashboard;
