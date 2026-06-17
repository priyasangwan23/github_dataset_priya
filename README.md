# 🚀 Dataset Management Full Stack System

A **scalable full-stack web application** for managing and querying large datasets with advanced filtering, search, authentication, and analytics capabilities.

---

## 📌 Project Overview

This project is a **full-stack dataset management system** that allows users to efficiently:

* Store large datasets
* Perform advanced queries
* Analyze data using aggregation
* Interact through a clean frontend UI

The system is designed using **industry-standard architecture** and focuses on scalability and performance.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React.js (Vite)
* Axios
* React Router
* CSS / Tailwind

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### 🔹 Tools

* Postman (API Testing)
* Git & GitHub

---

## 🧠 Key Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Protected routes

---

### 📊 Dataset Management (CRUD)

* Create dataset
* Fetch all datasets
* Fetch single dataset
* Update dataset
* Delete dataset

---

### 🔍 Advanced Querying

* Keyword-based search
* Dynamic filtering (type, repo, language, category, etc.)
* Pagination (page & limit)
* Sorting (ascending / descending)

---

### 📈 Analytics & Stats

* Total dataset count
* Type-based dataset distribution
* MongoDB aggregation pipelines

---

### ⚙️ Backend Features

* MVC Architecture
* Middleware (Logger, Error Handler, Auth)
* Validation system
* Rate limiting
* Clean API structure

---

### 🎨 Frontend Features

* Dataset listing UI
* Search and filter interface
* Pagination and sorting
* Authentication pages (Login/Register)
* Dashboard with analytics

---

## 📡 API Endpoints Overview

| Method | Endpoint                            | Description                 |
| ------ | ----------------------------------- | --------------------------- |
| GET    | `/datasets`                         | Fetch datasets with filters |
| GET    | `/datasets/:id`                     | Fetch dataset by ID         |
| POST   | `/datasets`                         | Create dataset              |
| PATCH  | `/datasets/:id`                     | Update dataset              |
| DELETE | `/datasets/:id`                     | Delete dataset              |
| GET    | `/search/datasets?q=`               | Search datasets             |
| GET    | `/stats/datasets/count`             | Get dataset count           |
| GET    | `/analytics/datasets/type-analysis` | Dataset analytics           |
| POST   | `/auth/register`                    | Register user               |
| POST   | `/auth/login`                       | Login user                  |

---

## 🔗 Important Links

| Resource               | Link                                             |
| ---------------------- | ------------------------------------------------ |
| 🌐 Frontend Deployed Link | `https://github-dataset-priya-3g6f.vercel.app/dashboard` |
| ⚙️ Backend Deployed Link  | `https://github-dataset-priya-1.onrender.com/`  |
| 📬 Postman Documentation | `https://documenter.getpostman.com/view/50840757/2sBXwtqpMZ`             |

---

## ⚡ Getting Started

### 🔹 Backend Setup

```bash
git clone <backend-repo>
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend server:

```bash
npm run dev
```

---

### 🔹 Dataset Seeding

```bash
npm run seed
```

> ⚠️ Note: Add your dataset JSON file manually inside the `/data` folder before running the seed command.

---

### 🔹 Frontend Setup

```bash
git clone <frontend-repo>
cd frontend
npm install
npm run dev
```

---

## 🧪 API Testing

All APIs were tested using **Postman**, including:

* CRUD operations
* Authentication
* Filtering & search
* Pagination & sorting
* Analytics APIs

---

## 🧠 Design Approach

Instead of creating multiple redundant endpoints, this project uses a:

👉 **Dynamic Query-Based API Design**

Example:

```
/datasets?type=function&language=python&page=1&limit=10
```

### Benefits:

* Scalable
* Clean code
* Avoids duplication
* Industry-standard approach

---

## 📦 Backend Folder Structure

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── middlewares/
 ├── config/
 ├── data/
 ├── seed.js
 ├── server.js
```

---

## 🚀 Future Improvements

* Redis caching for performance
* Role-based access control
* Advanced analytics dashboard
* Deployment (AWS / Render)

---

## 🎤 Conclusion

This project demonstrates:

* Scalable backend architecture
* Advanced API design
* Full-stack integration
* Real-world development practices

---

## 👤 Author

**Priya Sangwan**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
