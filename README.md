ReTrace AI — Image & Video Authenticity Analysis

ReTrace AI is an advanced media forensics system designed to analyze images and videos for authenticity. It detects AI-generated content, deepfakes, manipulations, NSFW content, watermarks, metadata inconsistencies, and more.
Built with a hybrid system combining custom ML models, FastAPI, Node.js, and external AI APIs, ReTrace AI delivers highly accurate authenticity reports.

🚀 Key Features
✅ Phase 1 — Safety Screening

NSFW content detection

Violence / harmful imagery detection

Safe vs Unsafe classification

Automatic blocking of unsafe media

✅ Phase 2 — Authenticity Analysis

AI-generated vs Real image detection

Deepfake identification

Manipulated / edited image detection

Filter / enhancement / retouching detection

Watermark detection & source tracing

Full metadata extraction (EXIF, device, software, GPS)

Authenticity scoring + quality insights

✅ Phase 3 — Enhanced External API Intelligence

Powered by industry-grade APIs:

Google Vision API

Hive AI (deepfake + AI-generated detection)

SightEngine (NSFW & content safety)

All results are automatically merged for maximum accuracy.

🧠 Custom ML Engine (FastAPI + PyTorch)

Runs custom CNN / ResNet50-based model

Provides authenticity probability score

Grad-CAM visualization (optional)

Video frame extraction & sequential analysis

Fully container-ready ML microservice

🖥️ Frontend (React.js)

JWT-based login/signup

Google reCAPTCHA protection

Drag & drop file upload

Real-time analysis progress

NSFW gatekeeper

Clean Final Result UI

Upload history + profile page

Smooth animations using Framer Motion

🔧 Backend (Node.js + Express)

JWT authentication

Email verification via Nodemailer

Secure file uploads (Multer)

MongoDB database integration

Routes → ML server → external APIs

Centralized result aggregation

📁 Project Structure
retrace-ai/
├── client/        # React frontend
├── server/        # Node.js backend (APIs, auth, integrations)
└── ml/            # FastAPI ML microservice (Phase 2 processing)

🛠 Tech Stack
Frontend

React.js

Axios

React Router

Framer Motion

Backend

Node.js

Express.js

MongoDB + Mongoose

Multer (file handling)

JWT / Nodemailer

Machine Learning

FastAPI

PyTorch

OpenCV

ResNet50 / Custom CNN

Grad-CAM

External APIs

Google Vision API

Hive AI

SightEngine (NSFW)

📦 Installation & Setup
1️⃣ Server Dependencies
cd server
npm install

2️⃣ Client Dependencies
cd client
npm install

3️⃣ ML Service Dependencies
cd ml
pip install -r requirements.txt

🔐 Environment Variables (server/.env)
PORT=5000
JWT_SECRET=your_secret
MONGODB_URI=mongodb://127.0.0.1:27017/retrace_ai

GOOGLE_VISION_API_KEY=xxxx
HIVE_API_KEY=xxxx
HIVE_API_SECRET=xxxx
NSFW_API_KEY=xxxx

SIGHTENGINE_API_USER=xxxx
SIGHTENGINE_API_SECRET=xxxx

ML_SERVER_URL=http://127.0.0.1:8000

▶️ How to Run
1️⃣ Start the ML Server
cd ml
uvicorn serve_v2:app --reload --host 0.0.0.0 --port 8000

2️⃣ Start the Backend
cd server
npm start

3️⃣ Start the Frontend
cd client
npm start

📊 Output / Report Includes

Safety status (NSFW, violence, harmful content)

AI-generated probability

Deepfake probability

Manipulation/editing detection

Filter/enhancement identification

Metadata & EXIF extraction

Watermark detection results

Quality & enhancement suggestions

Full result summary on the UI

🛡️ Security & Privacy

Files processed locally unless APIs are required

No permanent storage of uploaded media

JWT-protected backend routes

reCAPTCHA-protected signup

Email verification required

Secure server-to-ML communication

📘 License

This project is provided for educational and research purposes only.
