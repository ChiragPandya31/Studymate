# 🚀 StudyMate- Full Stack Web App

StudyMate is a student-focused web application designed to provide all essential academic resources in one place — including notes, previous year questions (PYQs), lab manuals, and AI-powered learning tools like summarization, MCQ generation, and quiz battles.

---

## 🌐 Live Demo

🔗 https://studymate-v1.vercel.app

---

## 🧱 Tech Stack

### Frontend (client)

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend (server)

* Node.js
* Express.js
* MongoDB
* Multer (file uploads)
* Groq API (AI processing)

---

## ✨ Features

### 📚 Learning Resources

* Browse study materials by course, semester, subject, and type
* Access notes, PYQs, and lab manuals in one place

### 🤖 AI-Powered Tools

* Upload PDFs and analyze them using AI
* Generate summaries and MCQs
* Extract patterns from previous year questions

### ⚔️ Quiz Battle

* Interactive quiz mode with instant feedback
* AI-generated questions

### 📦 Backend Capabilities

* REST APIs for managing study materials
* File upload and processing system
* MongoDB-based data storage

### 🎨 UI/UX

* Clean and responsive interface
* Minimal and user-friendly design

---

## 📁 Project Structure

```
studymate/
  client/   → Frontend (React)
  server/   → Backend (Node + Express)
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/studymate.git
cd studymate
```

---

## 🔹 Setup Frontend (client)

```bash
cd client
npm install
```

### Create `.env` file in `/client`

```env
VITE_API_BASE_URL="YOUR_BACKEND_URL"
ADMIN_PASS="YOUR_ADMIN_PASSWORD"
```

```bash
npm run dev
```

---

## 🔹 Setup Backend (server)

```bash
cd server
npm install
```

### Create `.env` file in `/server`

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API=your_groq_api_key
PORT=5000
```

```bash
npm run dev
```

---

## 🧠 Notes

* Make sure backend is running before using frontend
* Replace all environment variables with your own credentials
* Do not commit `.env` files

---

## 📌 Future Improvements (optional but good look 👀)

* Deploy backend with scalable storage (S3 / Cloudinary)
* Add authentication system
* Improve AI response optimization
* Dockerize for easier deployment

---

## 👨‍💻 Author

Chirag Pandya

---
