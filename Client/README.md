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
