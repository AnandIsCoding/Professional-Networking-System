# 🌐 Professional Networking System 

A full-featured MERN stack application built to emulate core functionality of platforms like LinkedIn. It includes real-time messaging, post sharing, comments, likes, notifications, profile/resume management, friend requests, and secure authentication with OTP and OAuth 2.0.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

* **OTP-based user registration** via email
* **Google OAuth 2.0 Login**
* **JWT-based authentication** (with token expiry)
* Email verification system with automatic token expiry
* Password encryption (bcrypt)

### 👤 User Profiles

* View and edit profile details: `fullName`, `headline`, `location`, etc.
* Upload and update:

  * Profile picture
  * Cover image/banner
  * Resume (PDF or DOC)
* Set current position, company, and bio

### 📰 Feed & Posts

* Create text/image/video posts
* Like/unlike posts
* Comment on posts
* Share posts
* View other users' posts on their profile
* Post visibility control (public/friends-only)

### ✉️ Friend Requests & Social Graph

* Send/cancel/accept/decline friend requests
* Follow/unfollow system
* View list of connections/followers
* Notification on friend request status

### 🖋️ Chat System

* One-to-one real-time messaging
* Image messages
* Read receipts (isRead)
* Typing indicator (optional)
* Show recent conversations
* View full chat history

### 📢 Notifications

* Real-time notifications for:

  * New friend request
  * Post likes/comments
  * New messages
* Mark notifications as read

### 📅 Resume & Job Ready Tools

* Upload and manage resume (Cloudinary integration)
* Add professional summary
* Export resume as PDF (optional future feature)

### ⌛ OTP & Email System

* Mailtrap SMTP integration
* OTP expires after 5 minutes
* Resend OTP button (disabled for 5 minutes)
* Welcome email after registration

### 🌐 Deployment Ready

* Deployed on **Render / Vercel / Railway** (customizable)
* Environment Variables using `.env`
* CORS handled for dev & prod

---

## 🪓 Technologies Used

### 🧰 Frontend

* **React.js** (with Hooks)
* **Tailwind CSS** + **daisyUI**
* Axios for API calls
* React Router v6
* Toast Notifications
* Google Authentication

### 🚀 Backend

* **Node.js** + **Express.js**
* **MongoDB** + **Mongoose**
* Socket.IO for real-time messaging
* JWT Authentication
* Cloudinary for file uploads
* nodemailer for email OTPs
* eslint 


### 📂 Folder Structure

```
/Client
  /Components
  /Pages
  /Redux
  /Assets

/Server
  /controllers
  /models
  /routes
  /middlewares
  /utils
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Professional-Networking-System.git
cd Professional-Networking-System
```

### 2. Environment Variables

Create `.env` files in `server/` and `client/` with the following:

#### Server `.env`

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/networking
JWT_SECRET=yourSecret
JWT_EXPIRY=1d
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USERNAME=yourUsername
SMTP_PASSWORD=yourPassword
SMTP_FROM_EMAIL=no-reply@network.com
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Run Dev Server

```bash
cd server && npm run dev
cd ../client && npm run dev
```

---

## 🚪 Future Improvements

* Group chat
* Voice/video call integration
* Resume builder with templates
* AI-based job suggestions
* Dark mode support
* Post analytics and impressions


---

## 🙏 Support

If you like this project, feel free to ⭐ the repo and follow for updates.

Connect with the developer:

* Email: [anandkumarj669@gmail.com](mailto:anandkumarj669@gmail.com)

---

## 📚 Credits

This project is built by **Anand Kumar Jha**, as part of a professional-grade MERN stack portfolio showcasing real-time systems, scalable architecture, and modular codebase design.

> “Build what you want to use.”
