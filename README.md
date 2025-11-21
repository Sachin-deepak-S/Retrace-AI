# ReTrace AI — Image & Video Authenticity Analysis

**ReTrace AI** is an advanced media forensics system designed to analyze images and videos for authenticity. It detects AI-generated content, deepfakes, manipulations, NSFW content, watermarks, metadata inconsistencies, and more.

Built with a hybrid system combining custom ML models, **FastAPI**, **Node.js**, and external **AI APIs**, ReTrace AI delivers highly accurate authenticity reports.

---

## 🚀 Key Features

### ✅ Phase 1 — Safety Screening
* **NSFW Content Detection:** Identifies explicit content immediately.
* **Harm/Violence Detection:** Flags violent or harmful imagery.
* **Safe vs. Unsafe Classification:** Automatic blocking of unsafe media.

### ✅ Phase 2 — Authenticity Analysis
* **AI-Generated vs. Real:** Detects synthetic media.
* **Deepfake Identification:** Analyzing facial inconsistencies.
* **Manipulation Detection:** Identifies editing, retouching, and filters.
* **Watermark Tracing:** Detects hidden watermarks and source tracing.
* **Metadata Extraction:** Full analysis of EXIF, device info, software used, and GPS data.
* **Scoring:** Provides an overall authenticity probability score.

### ✅ Phase 3 — Enhanced External API Intelligence
Powered by industry-grade APIs, results are aggregated for maximum accuracy:
* **Google Vision API**
* **Hive AI** (Deepfake + AI-generated detection)
* **SightEngine** (NSFW & content safety)

---

## 🧠 Architecture & Components

### Custom ML Engine (FastAPI + PyTorch)
* Runs custom **CNN / ResNet50-based models**.
* Provides authenticity probability scores.
* **Grad-CAM Visualization** (Optional heatmap of manipulated areas).
* Video frame extraction & sequential analysis.
* Fully container-ready ML microservice.

### 🖥️ Frontend (React.js)
* JWT-based Login/Signup with **Google reCAPTCHA**.
* Drag & drop file upload with real-time progress.
* **NSFW Gatekeeper:** Blocks content before full analysis if unsafe.
* Visual Result UI with smooth animations (**Framer Motion**).
* Upload history & user profile management.

### 🔧 Backend (Node.js + Express)
* Secure file uploads via **Multer**.
* **MongoDB** integration for user data and analysis logs.
* Centralized result aggregation (ML Server + External APIs).
* Email verification via **Nodemailer**.

---

## 🛠 Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Axios, React Router, Framer Motion |
| **Backend** | Node.js, Express.js, MongoDB + Mongoose, Multer, JWT, Nodemailer |
| **Machine Learning** | FastAPI, PyTorch, OpenCV, ResNet50 / Custom CNN, Grad-CAM |
| **External APIs** | Google Vision API, Hive AI, SightEngine |

---

## 📁 Project Structure

```bash
retrace-ai/
├── client/        # React frontend
├── server/        # Node.js backend (APIs, auth, integrations)
└── ml/            # FastAPI ML microservice (Phase 2 processing)
```
---
##📦 Installation & Setup
1️⃣ Server Dependencies

```bash

cd server
npm install
```
2️⃣ Client Dependencies

```Bash

cd client
npm install
```
3️⃣ ML Service Dependencies
```Bash

cd ml
pip install -r requirements.txt
```
---
🔐 Environment Variables
Create a .env file in the server/ directory and add the following configurations:


```Bash
PORT=5000
JWT_SECRET=your_secret_key_here
MONGODB_URI=mongodb://127.0.0.1:27017/retrace_ai

# External APIs
GOOGLE_VISION_API_KEY=your_google_api_key
HIVE_API_KEY=your_hive_api_key
HIVE_API_SECRET=your_hive_secret
NSFW_API_KEY=your_nsfw_key

# SightEngine
SIGHTENGINE_API_USER=your_sightengine_user
SIGHTENGINE_API_SECRET=your_sightengine_secret

# ML Service Connection
ML_SERVER_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
```
---
##▶️ How to Run
Run each component in a separate terminal window.

1. Start the ML Server
```Bash

cd ml
uvicorn serve_v2:app --reload --host 0.0.0.0 --port 8000
```
2. Start the Backend
```Bash

cd server
npm start
```
3. Start the Frontend
```Bash

cd client
npm start
```
---
##📊 Output / Report Includes
The system generates a comprehensive report containing:

Safety Status (NSFW, Violence, Harmful).

AI-Generated Probability Score.

Deepfake Probability Score.

Manipulation & Editing Detection.

Filter & Enhancement Identification.

Metadata & EXIF Data.

Watermark Detection.

Quality & Enhancement Suggestions.
---
##🛡️ Security & Privacy
Local Processing: Files are processed locally unless external APIs are required.

No Permanent Storage: Uploaded media is not permanently stored after analysis.

Authentication: JWT-protected backend routes.

Verification: Email verification and reCAPTCHA-protected signup.

Secure Communication: Encrypted server-to-ML communication.

##📘 License
This project is provided for educational and research purposes only.
