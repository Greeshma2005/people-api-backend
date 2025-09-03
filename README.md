# 🗂️ People Management Backend

This is a backend server built with **Node.js**, **Express**, and **MongoDB** to manage a collection of people. It supports CRUD operations and can handle multiple people at once.

---

## 🌟 Features

  - **CRUD Operations** for `Person` model:
  - **GET** `/person` – Retrieve all people
  - **POST** `/person` – Add multiple people at once
  - **PUT** `/person/:id` – Update a person by ID
  - **DELETE** `/person/:id` – Delete a person by ID
- 🌐 **CORS enabled** for frontend integration
- 📦 **JSON request parsing** using body-parser
- 🔒 MongoDB Atlas connection 
- ⚡ Lightweight, simple, and easy to extend

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Greeshma2005/people-api-backend.git
cd BACKEND
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file in the root directory

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### 4. Start the server

```bash
npm run dev
```

---

### 📁 Folder Structure

```bash
backend/
├── models/
│   └── Person.js          # Mongoose schema for Person
├── routes/
│   └── person.js          # Express routes for CRUD operations
├── .env                   # Environment variables 
├── .gitignore             # Ignore sensitive files (like .env, node_modules if needed)
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
└── index.js               # Main server file
```

