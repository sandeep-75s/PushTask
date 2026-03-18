# MyPustak — Full Stack Post Management App

> **MyPustak Full Stack Developer – 1 Hour Coding Challenge**  
> Stack: **MongoDB · Express.js · React.js · Node.js (MERN)** + TypeScript + TailwindCSS

---

## 📁 Project Structure

```
mypustak/
├── backend/                  # Node.js + Express + MongoDB API
│   ├── src/
│   │   ├── controllers/
│   │   │   └── postController.ts   # GET / POST / DELETE handlers
│   │   ├── models/
│   │   │   └── Post.ts             # Mongoose schema & model
│   │   ├── routes/
│   │   │   └── posts.ts            # Express router
│   │   ├── app.ts                  # Express app + middleware
│   │   └── index.ts                # Server entry + MongoDB connect
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # React + Vite + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostCard.tsx        # Individual post display
│   │   │   ├── PostForm.tsx        # Create post form with validation
│   │   │   ├── SkeletonCard.tsx    # Loading skeleton
│   │   │   └── ErrorBanner.tsx     # Error display
│   │   ├── hooks/
│   │   │   ├── usePosts.ts         # Custom hook: state + API calls
│   │   │   └── api.ts              # Axios service layer
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # React entry point
│   │   └── index.css               # Tailwind + global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally on `mongodb://localhost:27017`  
  *(Install: https://www.mongodb.com/try/download/community)*

---

### 1. Clone & install

```bash
git clone <your-repo-url>
cd mypustak
```

### 2. Backend setup

```bash
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env if needed (defaults work for local MongoDB)

# Start in development mode (hot reload)
npm run dev
```

Backend runs at → **http://localhost:5000**

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at → **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/posts` | Get all posts (newest first) | `200 OK` |
| `POST` | `/posts` | Create a new post | `201 Created` |
| `DELETE` | `/posts/:id` | Delete a post by MongoDB ID | `200 OK` |
| `GET` | `/health` | Health check | `200 OK` |

### Example Requests

**GET /posts**
```json
{
  "success": true,
  "count": 2,
  "data": [
    { "_id": "...", "title": "Hello World", "body": "My first post", "createdAt": "..." }
  ]
}
```

**POST /posts**
```bash
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "New Post", "body": "This is a new post"}'
```

**DELETE /posts/:id**
```bash
curl -X DELETE http://localhost:5000/posts/<mongodb_id>
```

---

## ✨ Features

### Backend
- ✅ Express.js REST API with TypeScript
- ✅ MongoDB + Mongoose with proper schema validation
- ✅ CORS configured for frontend dev server
- ✅ Proper HTTP status codes (200, 201, 400, 404, 500)
- ✅ Timestamps (`createdAt`, `updatedAt`) on all posts
- ✅ Input validation with meaningful error messages

### Frontend
- ✅ React 18 + TypeScript + Vite
- ✅ TailwindCSS with custom dark theme
- ✅ Loading skeleton cards
- ✅ Error handling with dismissable banners
- ✅ Form validation (client-side: required fields, max length)
- ✅ Optimistic UI updates (new post appears instantly)
- ✅ Staggered animation on post cards
- ✅ Responsive layout (sidebar + feed)

---

## 🏗️ Build for Production

```bash
# Backend
cd backend && npm run build
node dist/index.js

# Frontend
cd frontend && npm run build
npm run preview
```

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | MongoDB + Mongoose |
| Backend | Node.js, Express.js, TypeScript |
| Frontend | React 18, TypeScript, Vite |
| Styling | TailwindCSS, custom design system |
| HTTP Client | Axios |
| Dev Tools | ts-node-dev, ESLint |
