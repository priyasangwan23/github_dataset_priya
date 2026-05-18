# AI Dataset Backend API

A production-ready backend API built using **Node.js**, **Express.js**, and **MongoDB** for managing AI/code datasets.

This project provides:

- RESTful APIs
- CRUD Operations
- Authentication using JWT
- Filtering, Searching, Pagination & Sorting
- Aggregation & Analytics APIs
- Middleware-based architecture
- Scalable MVC folder structure

---

# 🚀 Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |

---

# 📁 Project Structure

```bash
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── services/
│
├── models/
│
├── routes/
│
├── middlewares/
│
├── utils/
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

# 📌 Features

## ✅ Core Backend Features

- RESTful API architecture
- MongoDB integration using Mongoose
- MVC architecture
- Modular and scalable backend structure
- Environment variable configuration

---

## ✅ CRUD Operations

| Feature | Status |
|---|---|
| Create Dataset | ✅ |
| Fetch All Datasets | ✅ |
| Fetch Dataset By ID | ✅ |
| Update Dataset | ✅ |
| Delete Dataset | ✅ |

---

## ✅ Advanced Query Features

- Filtering
- Searching
- Pagination
- Sorting
- Dynamic query building

---

## ✅ Authentication Features

- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Password Hashing using bcrypt

---

## ✅ Middleware Features

- Authentication Middleware
- Logger Middleware
- Error Handling Middleware
- Rate Limiting Middleware

---

## ✅ Analytics & Aggregation

- Dataset Statistics
- Type Analysis
- Repository Analysis
- Aggregation Pipelines

---

# 🗄️ Dataset Structure

```json
{
  "id": "string",
  "instruction": "string",
  "input": "string",
  "output": "string",
  "metadata": {
    "type": "string",
    "code_element": "string",
    "repo_name": "string",
    "file_path": "string",
    "source_type": "string"
  }
}
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Navigate to Project Directory

```bash
cd project-name
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 5️⃣ Start Development Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# 🔗 API Endpoints

# 📂 Dataset Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/datasets` | Fetch all datasets |
| GET | `/datasets/:id` | Fetch dataset by ID |
| POST | `/datasets` | Create new dataset |
| PATCH | `/datasets/:id` | Update dataset |
| DELETE | `/datasets/:id` | Delete dataset |

---

# 🔍 Query Features

## Filtering

```bash
/datasets?type=function
```

---

## Search

```bash
/datasets?search=python
```

---

## Pagination

```bash
/datasets?page=1&limit=10
```

---

## Sorting

```bash
/datasets?sort=repo_name
```

---

# 🔐 Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |

---

# 📊 Analytics Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/analytics/datasets/type-analysis` | Analyze datasets by type |
| GET | `/analytics/datasets/repo-analysis` | Analyze repositories |

---

# 📈 Statistics Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats/datasets/count` | Total dataset count |
| GET | `/stats/datasets/repos` | Total repositories count |

---

# 🛡️ Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Input Validation
- Global Error Handling
- Rate Limiting

---

# ⚡ Middleware Used

| Middleware | Purpose |
|---|---|
| Authentication Middleware | Protect private routes |
| Logger Middleware | Log incoming requests |
| Error Handling Middleware | Handle application errors |
| Rate Limiting Middleware | Prevent API abuse |

---

# 📦 MongoDB Features Used

- Schema Validation
- Indexing
- Aggregation Pipeline
- Dynamic Querying
- Pagination
- Projection
- Sorting

---

# 🧪 API Testing

API testing was performed using:

- Postman

Postman collection is included in the project.

---

# 🧠 Learning Outcomes

This project demonstrates understanding of:

- REST API Development
- MongoDB & Mongoose
- MVC Architecture
- Authentication & Authorization
- Middleware System
- Aggregation Framework
- Backend Scalability Concepts
- Error Handling
- API Optimization

---

# 🚀 Future Improvements

- Swagger Documentation
- Redis Caching
- Docker Deployment
- Unit Testing
- CI/CD Integration

---

# 👨‍💻 Author

Developed as part of the **Full Stack Backend Project Assignment – 2026**

---
