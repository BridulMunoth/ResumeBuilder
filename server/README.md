# 🧠 ResumeBuilder API

A **Node.js + Express backend** for building and managing resumes with **AI-assisted content generation**.  
Includes secure authentication, resume CRUD operations, AI endpoints for enhancement and data extraction, and image upload via Multer + ImageKit.  
MongoDB is used for data persistence.

---

## ⚙️ Tech Stack
- **Node.js / Express** (ES Modules)
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer** (file uploads)
- **ImageKit** (image processing & storage)
- **OpenAI API** (AI text generation & data extraction)
- **CORS**, **dotenv**, **nodemon**

---

## ✨ Features
- Secure user authentication with hashed passwords.
- Resume management (Create, Update, Delete, Get, Public view).
- AI-powered endpoints to:
  - Enhance professional summaries.
  - Improve job descriptions.
  - Parse raw resume text into structured JSON and store it.
- Image uploads with optional background removal via ImageKit.
- Clean RESTful architecture with modular controllers and middleware.

---

## 🧩 Prerequisites
- Node.js **v18+**
- MongoDB connection (Atlas or local)
- OpenAI API key (for AI endpoints)
- ImageKit credentials *(optional, required for image upload)*

---

## 🔑 Environment Variables
Create a `.env` file inside `/server`:

```env
# Server
PORT=3000
JWT_SECRET=replace-with-strong-secret

# Database
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster-host>

# OpenAI
OPENAI_API_KEY=your-openai-key
OPENAI_BASE_URL=your-openai-endpoint
OPENAI_MODEL=gpt-4o-mini

# ImageKit (optional)
IMAGEKIT_PRIVATE_KEY=your-private-key
```

> **Note:**
>
> * Database connects to `${MONGODB_URI}/Resume Builder`.
> * JWT token must be sent in `Authorization` header as raw token (no "Bearer" prefix).

---

## 🚀 Installation & Run

From the `server` directory:

```bash
npm install
npm run server   # Development mode (nodemon)
# or
npm start        # Production mode
```

Server runs on **[http://localhost:3000](http://localhost:3000)**

---

## 📡 API Overview

### 🔐 Auth — `/api/users`

| Method | Endpoint    | Description                            |
| ------ | ----------- | -------------------------------------- |
| POST   | `/register` | Register new user                      |
| POST   | `/login`    | Login and receive token                |
| GET    | `/data`     | Get authenticated user info            |
| GET    | `/resumes`  | Get all resumes for authenticated user |

---

### 📄 Resumes — `/api/resumes`

| Method | Endpoint            | Description                           |
| ------ | ------------------- | ------------------------------------- |
| POST   | `/create`           | Create a new resume                   |
| PUT    | `/update`           | Update resume (supports image upload) |
| DELETE | `/delete/:resumeId` | Delete a resume                       |
| GET    | `/get/:resumeId`    | Get a specific resume                 |
| GET    | `/public/:resumeId` | Fetch a public resume                 |

---

### 🤖 AI — `/api/ai`

| Method | Endpoint            | Description                                              |
| ------ | ------------------- | -------------------------------------------------------- |
| POST   | `/enhance-pro-sum`  | Enhance professional summary                             |
| POST   | `/enhance-job-desc` | Improve job description                                  |
| POST   | `/upload-resume`    | Extract structured resume data using OpenAI and store it |

---

