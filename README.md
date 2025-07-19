# 📚 Library Management System - Backend

A backend service designed to manage a library's operations including books, and borrowing records. This system provides a set of RESTful APIs for frontend integration and can be extended in the future with new features such as notifications or fine calculations.

---

## 🚀 Overview

This backend system supports CRUD operations for books and borrowing activities. Built using Express.js and MongoDB, the architecture follows a modular folder structure to ensure maintainability and scalability.

---

## ⚙️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building APIs
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM for schema modeling
- **TypeScript** – Adds static typing
- **Dotenv** – Environment variable manager
- **TS-Node-Dev** – Auto-restarting dev server and parse typescript
- **ZOD** – TypeScript-first schema validation

---

## ✨ Features

- 📚 CRUD operations for books with filters
- 📖 Borrow books and borrow summery
- 📊 Book availability status
- 🧾 Borrow history tracking
- 🚀 RESTful API design
- ❌ Centralized error handling
- 📦 Modular code structure

---

## 📦 Dependencies

### Core Dependencies

- "dotenv": "^17.2.0",
- "express": "^5.1.0",
- "mongoose": "^8.16.4",
- "zod": "^4.0.5",
- "isbn3": "^1.2.12"

### Dev Dependencies

- "@eslint/js": "^9.31.0",
- "@types/express": "^5.0.3",
- "@types/node": "^24.0.14",
- "eslint": "^9.31.0",
- "globals": "^16.3.0",
- "ts-node-dev": "^2.0.0",
- "typescript": "^5.8.3",
- "typescript-eslint": "^8.37.0"

---

## 🛠️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/AskatAsh/Library-Management-Backend.git
cd library-management-backend
```

2. **Create a `.env` File**

```env
PORT=5000
DATABASE_URI=your_mongodb_connection_string
```

3. **Install Dependencies**

Using **Yarn**:

```bash
yarn install
```

Or using **npm**:

```bash
npm install
```

4. **Start the Development Server**

With Yarn:

```bash
yarn dev
```

With npm:

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── controllers/     # Route handler logic
│   ├── models/          # Mongoose models
│   ├── interfaces/      # TypeScript interfaces
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

---

## 📘 API Documentation

### Sample Endpoints

- `GET /api/books` – Get all books (max 10 by default)
- `GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5` – Get books using filter, sort and limit
- `POST /api/books` – Add a new book
- `PUT /api/books/:bookId` – Update a book
- `DELETE /api/books/:bookId` – Remove a book
- `POST /api/borrow` – Borrow a book
- `GET /api/borrow` – Borrow book summery

Use Postman or Swagger for API testing and exploration.

---

## 🧪 Testing (Optional)

> Add your preferred testing framework like Jest or Mocha

```bash
yarn test
```

---

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**M. A. Askat**  
Backend Developer | Full Stack Enthusiast  
[GitHub](https://github.com/AskatAsh) | [LinkedIn](https://linkedin.com/in/m-a-askat)
