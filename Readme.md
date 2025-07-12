# 🌐 Professional Networking System

A full-featured, real-time **MERN stack** application replicating core functionalities of LinkedIn — including chat, posts, resume uploads, friend requests, and a responsive UI.

🌐 **Live**: [https://devlinked.site](https://devlinked.site)
🔐 **Domain**: Purchased from **GoDaddy**
💻 **Deployment**: Hosted on **AWS EC2**, using **PM2**, **Nginx**, and **MongoDB**
📂 Frontend and Backend repos provided below ↓

---

## 🖼️ Screenshots

### 🔻 Feed Page

![Feed Screenshot](https://res.cloudinary.com/dm0rlehq8/image/upload/v1752338912/Screenshot_2025-07-12_195414_csmdce.png)

### 💬 Messages

![Messages Screenshot](https://res.cloudinary.com/dm0rlehq8/image/upload/v1752338974/Screenshot_2025-07-12_195442_gfdy5y.png)

### 👤 Profile Page

![Profile Screenshot](https://res.cloudinary.com/dm0rlehq8/image/upload/v1752339001/Screenshot_2025-07-12_221557_cvzisc.png)

---

## ✨ Key Features

### 🔐 Authentication & Security

* OTP-based signup via email (expires in 5 mins)
* Google OAuth 2.0 login
* JWT-based session management
* Password encryption using bcrypt
* Resend OTP cooldown logic
* Email verification + welcome mail via SMTP

### 👥 Profiles & Resume

* Edit name, headline, company, bio, location, banner image, profile pic
* Upload profile photo, banner, and resume
* Resume view/download for other users
* Add experience and summary

### 📢 Feed System

* Text, image post creation
* Like/unlike posts
* Comment system
* Share posts
* Share profile

### 🤝 Social Graph

* Send, accept, or decline friend requests
* Follower/following model
* View your connections
* Notifications for new requests and updates

### 💬 Realtime Chat

* One-on-one real-time messaging (via Socket.IO)
* Read receipts (`isRead`)
* Image messaging
* Chat history and recent conversations

### 🔔 Notifications

* Real-time alerts for:

  * New messages
  * Likes/comments
  * Friend requests
  * Redirect accorfing to notification type (comment, friend request)

### 📄 Resume Tools

* Upload resume in PDF/DOC (Cloudinary)
* Future: Resume builder and export templates

---

## 🧰 Tech Stack

### Frontend

* React.js with Hooks
* Tailwind CSS + daisyUI
* Axios (API calls)
* React Router v6
* React Toastify (notifications)
* Google Auth with OAuth 2.0

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* Socket.IO for real-time chat
* JWT for secure tokens
* Cloudinary (for image and file uploads)
* Nodemailer + Otp-Generator
* PM2 for process management
* Nginx for proxy and HTTPS routing

---

## 📁 Folder Structure

```
/client
  ├─└ Components
  ├─└ Pages
  ├─└ Redux
  └─└ Assets

/server
  ├─└ controllers
  ├─└ models
  ├─└ routes
  ├─└ middlewares
  └─└ utils
```

---

## 🐾 Deployment Summary

* **AWS EC2** for backend hosting (Ubuntu 20.04)
* **Nginx** as a reverse proxy for Node + React + WebSocket
* **PM2** to keep the backend server alive
* **MongoDB** (local or Atlas)
* **HTTPS** enabled via Nginx and domain from GoDaddy
* **React frontend** served via Nginx `/var/www/html`

---

## 🔗 Repositories

> Replace these URLs with actual repo links.

* **Frontend Repository**: [https://github.com/AnandIsCoding/LinkedIn-web.git](#)
* **Backend Repository**: [https://github.com/AnandIsCoding/LinkedIn-server.git](#)

---

## 🧲 Local Setup Guide

### 1. Clone Project

```bash
git clone https://github.com/your-username/Professional-Networking-System.git
cd Professional-Networking-System
```

### 2. Environment Variables

#### Server `.env`

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/networking
JWT_SECRET=yourSecret
JWT_EXPIRY=1d

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USERNAME=yourUsername
SMTP_PASSWORD=yourPassword
SMTP_FROM_EMAIL=no-reply@yourdomain.com

FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Run in Dev Mode

```bash
cd server && npm run dev
cd ../client && npm run dev
```

---

## ✨ Future Features (Planned)

* Group messaging support
* Video & voice calling
* Resume builder + templates
* AI job matching (via OpenAI or similar)
* Post impressions, analytics, and shares tracking

---

## 🙋‍♂️ Author

Created with ❤️ by **Anand Kumar Jha**

📧 Email: [anandkumarj669@gmail.com](mailto:anandkumarj669@gmail.com)
🌐 Website: [https://anandjii.web.app](https://devlinked.site)

> “Build what you want to use.”
