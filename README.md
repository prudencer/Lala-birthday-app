# Lala Birthday Surprise App 🎉💖

A full-stack birthday surprise web application built with React, Express, MongoDB Atlas, and Bootstrap.

The application was created as a digital birthday surprise for Lala, allowing friends and family to:
- View birthday memories and photos
- Leave birthday wishes and messages
- Read a hidden special letter available only through a special login password

The application is fully responsive and works on both phones and laptops.

---

# Features

## 🎂 Birthday Gallery
- Displays a collection of birthday photos
- Each photo includes a short personal message

## 💌 Birthday Messages
- Visitors can submit birthday wishes
- Messages are stored permanently using MongoDB Atlas
- Submitted messages appear in responsive message cards

## 🔐 Login System
Two login modes are available:

### Standard Login
Provides access to:
- Birthday memories
- Message submission
- Birthday messages from friends and family

### Special Login
Provides access to everything above PLUS:
- A hidden "Special Message" tab
- A personal birthday letter

## 🎉 Welcome Modal
After login, users are greeted with a welcome popup asking them to leave a birthday message.

## 📱 Responsive Design
The application is mobile-friendly and adapts to:
- Phones
- Tablets
- Laptops
- Desktop screens

---

# Technologies Used

## Frontend
- React
- Vite
- Bootstrap
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

## Deployment
- Render (Frontend + Backend)
- MongoDB Atlas (Database)

---

# Project Structure

```txt
lala-birthday-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── images/
    └── src/
        ├── services/
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/lala-birthday-app.git
cd lala-birthday-app
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create:

```txt
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create:

```txt
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

# MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Add network access:
   ```txt
   0.0.0.0/0
   ```
5. Copy connection string
6. Add it to backend `.env`

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lalaBirthdayDB?retryWrites=true&w=majority
```

---

# Login Credentials

## Standard Access

```txt
Username: lame
Password: birthday
```

## Special Access

```txt
Username: lame
Password: prudence
```

Both username and passwords are case-insensitive.

---

# Adding Photos

Place photos inside:

```txt
frontend/public/images/
```

Example:

```txt
photo1.jpg
photo2.jpg
photo3.jpg
photo4.jpg
photo5.jpg
```

---

# Deployment

## Backend
Deploy backend to Render Web Service.

### Backend Settings

```txt
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Environment Variables:

```env
MONGO_URI=your_connection_string
CLIENT_URL=https://your-frontend-url.onrender.com
```

---

## Frontend
Deploy frontend to Render Static Site.

### Frontend Settings

```txt
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

Environment Variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

# Future Improvements

Possible future enhancements:
- Real authentication system
- Photo upload dashboard
- Music background
- Animated birthday effects
- Email birthday invitations
- Reactions/likes on messages
- Admin moderation tools

---

# Author

Created by Prudence