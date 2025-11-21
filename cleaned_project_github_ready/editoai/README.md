# Retrace AI

A full-stack MERN application for image analysis using machine learning APIs.

## Features
- User authentication (login, signup)
- Image upload and analysis
- NSFW detection
- Metadata extraction
- Google Vision API integration
- Sightengine API integration
- Hive Moderation API integration
- Standalone dashboard option

## Project Structure
```
retrace-ai/
├── client/                 # React frontend
├── server/                 # Express.js backend with authentication
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- API keys for external services (Google Vision, Sightengine, Hive Moderation)

### Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```
MONGODB_URI=mongodb://127.0.0.1:27017/retrace_ai
JWT_SECRET=your_jwt_secret_here
SIGHTENGINE_API_USER=your_sightengine_user
SIGHTENGINE_API_SECRET=your_sightengine_secret
HIVE_API_KEY=your_hive_api_key
```

For Google Vision API, place your `google-key.json` file in `server/config/`.

### Installation
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### How to Run
```bash
# Run both client and server concurrently
npm run dev-all

# Or run separately:
# Server (port 5000)
npm run dev-server

# Client (port 3000)
npm run dev-client
```

### Build Commands
```bash
# Build client for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Docker
```bash
# Build and run with Docker
docker build -t retrace-ai .
docker run -p 5000:5000 retrace-ai
```

## API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/analyze/analyze` - Analyze uploaded image

## Folder Structure
- `client/` - React application
- `server/` - Express.js API server
  - `controllers/` - Route handlers
  - `models/` - MongoDB models
  - `routes/` - API routes
  - `utils/` - Utility functions
  - `middleware/` - Custom middleware

## Screenshots
(Add screenshots here after setup)
