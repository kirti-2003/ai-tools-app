# ai-tools-app

A full-stack web application built with **React** (frontend) and **Node.js/Express** (backend) that showcases various AI tools with the ability to favorite and manage them.

## 🗂️ Project Structure

ai-tools-app/
├── client/ # Frontend (React)
├── server/ # Backend (Node.js + Express)
├── README.md
├── .gitignore
└── package.json # Root config (if monorepo-style)
### 🔹 Frontend (React - inside `client/`)
- ReactJS
- Tailwind CSS or plain CSS (depending on your setup)
- Axios (for API calls)
- Toast Notifications (e.g. ShadCN or React-Toastify)

### 🔹 Backend (Node.js - inside `server/`)
- Node.js
- Express.js
- CORS & dotenv
- (Optional) MongoDB or JSON-based in-memory storage

---

## ✨ Features

- 💡 Discover AI tools and utilities
- 🔄 Two-way communication between client and server
- 🔐 Secure backend API with proper middleware
- 📦 Modular code structure

---

## 🛠️ Getting Started (Local Development)

### 📍 Prerequisites
- Node.js & npm installed
- Git installed
 # Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

Run the App

# Start backend
cd server
node server.js

# In another terminal, start frontend
cd ../client
npm start

App runs on:

Frontend: http://localhost:3000

Backend: http://localhost:5000

