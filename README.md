# 🧠 Brainstorm – Real-Time Idea Collaboration Platform

🚀 **Brainstorm** is a full-stack web application designed to help users create, manage, and collaborate on innovative ideas in real-time. It enables structured brainstorming sessions where users can share ideas, vote, and organize thoughts efficiently.

---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* 🧠 Create and Manage Brainstorm Sessions
* 💡 Add Ideas to Sessions
* 👍 Voting System for Ideas
* 📊 Organized Dashboard View
* ⚡ Real-time-like interaction (refresh-based sync)
* ☁️ Fully deployed (Frontend + Backend + Database)

---

## 🏗️ Tech Stack

### Frontend

* React.js
* HTML5, CSS3
* Axios (for API communication)

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (Neon DB)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon

---

## 📂 Project Structure

brainstorm/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│
└── README.md

---

## ⚙️ How It Works

### 🔄 Application Flow

1. User registers or logs in
2. Frontend sends requests using Axios
3. Backend (Express) processes API routes
4. PostgreSQL database stores/retrieves data
5. Backend sends response
6. Frontend updates UI dynamically

---

## 🔌 API Endpoints

### 👤 User Routes

* `POST /users/register` → Register a new user
* `POST /users/login` → Login user

### 🧠 Session Routes

* `GET /sessions` → Fetch all sessions
* `POST /sessions` → Create new session

---

## 🗄️ Database Schema

### Users Table

| Column   | Type   |
| -------- | ------ |
| id       | SERIAL |
| name     | TEXT   |
| email    | TEXT   |
| password | TEXT   |
| role     | TEXT   |

### Sessions Table

| Column      | Type      |
| ----------- | --------- |
| id          | SERIAL    |
| title       | TEXT      |
| description | TEXT      |
| created_by  | INTEGER   |
| created_at  | TIMESTAMP |

### Ideas Table

| Column     | Type    |
| ---------- | ------- |
| id         | SERIAL  |
| content    | TEXT    |
| category   | TEXT    |
| session_id | INTEGER |
| author     | TEXT    |
| votes      | INTEGER |

---

## 🌐 Deployment Links

* Frontend: https://your-vercel-link.vercel.app
* Backend: https://your-render-link.onrender.com

---

## 🛠️ Installation (Local Setup)

### 1️⃣ Clone Repository

git clone https://github.com/your-username/brainstorm.git
cd brainstorm

---

### 2️⃣ Backend Setup

cd backend
npm install

Create `.env` file:

DATABASE_URL=your_neon_database_url

Run backend:

npm start

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

---

## 📸 Screenshots

* Dashboard UI
* Login Page
* Session Creation

(Add screenshots here later for better presentation)

---

## 💡 Why PostgreSQL?

* Structured relational data
* Strong consistency
* Supports joins (important for sessions & ideas)
* Better suited for scalable backend systems

---

## 🚀 Future Improvements

* Real-time collaboration using WebSockets
* AI-based idea suggestions
* Session sharing via links
* Role-based access control

---

## 👨‍💻 Author

**Ram Krishna**

* 💼 Aspiring Full Stack Developer
* 🚀 Passionate about building real-world applications

---

## ⭐ Acknowledgements

* React Documentation
* Express.js Documentation
* PostgreSQL / Neon
* Render & Vercel

---

## 📢 Final Note

This project demonstrates:

* Full-stack development
* API design
* Database integration
* Authentication systems
* Deployment skills

---
