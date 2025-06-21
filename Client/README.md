<small>



## 🔐 Authentication with Google

### 📦 Step 1: Install the package

```bash
npm install @react-oauth/google
```

---

### 🛠️ Step 2: Import in `main.jsx`

```js
import { GoogleOAuthProvider } from '@react-oauth/google';
```

---

### ☁️ Step 3: Create a Google Project

* Go to [Google Cloud Console](https://console.cloud.google.com/)
* Navigate to **API & Services** → **Credentials**
* Click **Create Credentials** → Choose **OAuth Client ID**
* If prompted, configure the **OAuth consent screen** (choose **External/Public**)
* After creation, copy the **Client ID**

---

### 🗝️ Step 4: Add the Client ID to `.env` (frontend)

```env
VITE_GOOGLE_AUTH_KEY=your-google-client-id
```

> ⚠️ Use `VITE_` prefix if you're using Vite

---

### ⚙️ Step 5: Wrap your App with `GoogleOAuthProvider` in `main.jsx`

```js
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_KEY}>
  <App />
</GoogleOAuthProvider>
```

---

### 🧩 Step 6: Create `GoogleLoginComponent.jsx`

```jsx
import { GoogleLogin } from "@react-oauth/google";
import React from "react";

function GoogleLoginComponent() {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  return (
    <div className="w-full  flex justify-center my-4 rounded-lg ">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        width="280"
      />
    </div>
  );
}

export default GoogleLoginComponent;

```

---

### ✅ Done!

You now have a fully working Google Authentication setup in your React application. 


--------------------------------------------------------------
--------------------------------------------------------------


## 🔐 Google Authentication – Backend Setup (Node.js + Express + MongoDB)

This guide explains how to implement Google login functionality in the backend using `google-auth-library`, Express, and Mongoose.

---

### 📆 Step 1: Install Required Package

```bash
npm install google-auth-library
```

---

### 🌍 Step 2: Add Environment Variable

Create a `.env` file in the backend root and add:

```env
CLIENT_ID=your-google-client-id
```

---

### 🧠 Step 3: Create Google OAuth Client

At the top of your controller file (e.g., `auth.controller.js`):

```js
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);
```

---

### 🗃️ Step 4: User Schema (`models/user.model.js`)

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  fullName: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/your-cloud/image/upload/v123456789/default_profile.jpg",
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
```

---

### 🔄 Step 5: Google Login/Register Controller

```js
import User from "../models/user.model.js";

export const registerWithGoogleController = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        fullName: name,
        profilePic: picture,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
        error: messages[0],
      });
    }

    console.error("Google Auth Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
```

---

### 🚣️ Step 6: Route Setup (`routes/auth.route.js`)

```js
import express from "express";
import { registerWithGoogleController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/google", registerWithGoogleController);

export default router;
```

---

### 🧪 Step 7: Frontend Sends Token to Backend

```js
const response = await axios.post("/api/v1/auth/google", {
  token: credentialResponse.credential,
});
```

---

### ✅ Done!

Your backend now supports **Google OAuth Authentication**.

---

### 🔐 Optional Next Steps

* Generate and send a JWT on successful login
* Secure routes with middleware
* Store session/token in cookies or localStorage
* Add refresh token logic for longer sessions






</small>