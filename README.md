# 💰 Personal Expense Tracker

A modern and responsive **MERN Stack** application for managing daily expenses. Users can add, view, sort, and delete expenses while automatically tracking the total amount spent.

---

## 🌐 Live Demo

### Frontend
https://expense-tracker-1-ykz1.onrender.com/

### Backend API
https://expense-tracker-wyi0.onrender.com/api/v1/expences

---

## ✨ Features

- ➕ Add a new expense
- 📋 View all expenses
- 🗑 Delete expenses
- 💰 Automatic total expense calculation
- 🔄 Sort expenses (Recent / Oldest)
- ⚡ Loading skeleton while fetching data
- 📱 Responsive UI
- 🎨 Category icons for better visualization
- ☁️ MongoDB Atlas database integration

---

## 🛠 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment

- Render
- MongoDB Atlas

---

## 📂 Project Structure

```text
expense_tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/expences` | Get all expenses |
| POST | `/api/v1/expences` | Add a new expense |
| DELETE | `/api/v1/expences/:expenseId` | Delete an expense |

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Maheshs-Github/expense_tracker.git
```

Move into the project directory.

```bash
cd expense_tracker
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file.

```env
PORT=7000
MONGO_URL=your_mongodb_connection_string
ORIGIN=http://localhost:5173
```

Run the backend.

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file.

```env
VITE_BACKEND_URL=http://localhost:7000/api/v1/
```

Run the frontend.

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

## 🚀 Future Improvements

- ✏️ Edit Expense
- 🔍 Search Expenses
- 🏷 Category Filters
- 📊 Expense Analytics & Charts
- 📅 Monthly Reports
- 👤 User Authentication

---

## 👨‍💻 Author

**Mahesh Mane**

- GitHub: https://github.com/Maheshs-Github

---

## ⭐ If you found this project useful, consider giving it a Star!
