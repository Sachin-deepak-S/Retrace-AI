ReTrace AI — Image & Video Authenticity Analysis

ReTrace AI is an advanced media-forensics system that analyzes images and videos to detect AI-generated content, deepfakes, manipulations, edits, watermarks, NSFW content, and authenticity signals. It provides detailed analysis reports using a hybrid approach powered by external AI APIs and a custom ML pipeline.

🚀 Features
✅ Phase 1 — Safety Screening

NSFW content detection

Violence, explicit or harmful content identification

Safe/Unsafe classification

Immediate block if unsafe

✅ Phase 2 — Authenticity Analysis

AI-generated image detection

Deepfake detection

Manipulated image detection

Edit/Filter/Enhancement detection

Watermark detection and source tracing

Metadata extraction (EXIF, software, location, device)

Quality scoring & enhancement suggestions

✅ Phase 3 — External AI API Enhancements

Powered by:

Google Vision API

Hive AI API (deepfake + AI-generated detection)

SightEngine / NSFW API
Results combined intelligently for maximum accuracy.

🧠 Custom ML FastAPI Server

Runs custom PyTorch model

Provides authenticity score

Optional Grad-CAM heatmaps

Video frame extraction and analysis

🖥️ Frontend (React)

Login / Signup with JWT

reCAPTCHA protection

Drag-and-drop file upload

Real-time progress updates

NSFW gatekeeper → stops unsafe files

Final Results Page

Upload history, profile, and UI animations

🔧 Backend (Node + Express)

JWT authentication

Email verification

Secure file uploads (multer)

Connects React → Node → FastAPI → External APIs

Central result aggregation

📁 Project Structure
editoai/
├── client/              # React frontend
├── server/              # Node.js backend + API integrations
└── ml/                  # FastAPI ML service (Phase 2)

🛠 Tech Stack
Frontend

React.js

Framer Motion

Axios

React Router

Backend

Node.js

Express.js

MongoDB + Mongoose

Multer file uploads

JWT authentication

Nodemailer

Machine Learning

FastAPI

PyTorch

OpenCV

Custom CNN / ResNet50

Grad-CAM visualization

External APIs

Google Vision API

Hive AI API

SightEngine NSFW API

📦 Setup Instructions
1️⃣ Install server dependencies
cd server
npm install

2️⃣ Install client dependencies
cd client
npm install

3️⃣ Install ML service dependencies
cd ml
pip install -r requirements.txt

4️⃣ Configure environment variables (server/.env)
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

5️⃣ Run the ML service
cd ml
uvicorn serve_v2:app --reload --host 0.0.0.0 --port 8000

6️⃣ Run the server
cd server
npm start

7️⃣ Run the client
cd client
npm start

📊 Output

ReTrace AI returns a full authenticity report including:

NSFW / Safety

AI-generated probability

Deepfake probability

Manipulation probability

Edit/filter detection

Metadata extraction

Watermark result

Enhancement suggestions

All results are displayed cleanly on the Results Page.

🛡️ Security & Privacy

Files processed locally (unless API requested)

No file permanently stored

JWT-protected backend routes

reCAPTCHA protected signup

Email verification

📘 License

This project is for educational and research purposes.
