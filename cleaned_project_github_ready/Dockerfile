# Best-effort Node.js Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
# Install dependencies (use npm ci if package-lock.json available)
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi
COPY . .
CMD ["npm", "start"]
