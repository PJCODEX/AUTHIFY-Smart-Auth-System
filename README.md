# 🔐 Authify – Full-Stack Form Validation & Dynamic DOM App

> ✅ Internship Project for Cognifyz – Task 4: Complex Form Validation & Dynamic DOM Manipulation

---

## 📌 Project Objective

The goal of this project was to demonstrate real-world full-stack skills by:

- Enhancing form validation with **complex rules** like password strength checks
- Implementing **dynamic DOM updates** for live feedback and interactivity
- Adding **client-side routing** for a seamless single-page application experience
- Connecting to a custom **Node.js/Express backend API** for authentication logic

---

## 🧠 Key Features

- 🔒 **Real-time Password Strength Meter** (Live feedback on weak/medium/strong)
- 👁️ **Password Toggle Visibility** (Show/hide password)
- 🧭 **Client-side Routing** (Hash-based navigation: login, register, dashboard)
- ✅ **Email Format Validation** (Regex-based)
- 🔁 **Login/Register API Integration** (with mock backend,in memory storage)
- 💬 **Live Error Feedback** (Empty field checks, mismatch handling)

---

## 🔧 Technologies Used

| Layer        | Tech Stack                        |
|--------------|-----------------------------------|
| Frontend     | HTML, CSS, JavaScript     |
| Backend      | Node.js, Express.js               |
| Styling      | CSS (Responsive Layout)    |
| Tools        | Vercel (Frontend Deploy), Render (Backend Deploy)

---

## 🚀 Live Demo

> 🌐 Frontend: (https://authify-smart-auth-system.vercel.app/)  
> ⚙️ [Backend (Render)]() (for testing)

---

## 📚 What I Learned

- How to build a **single-page application (SPA)** using JS and DOM routing
- Using **event listeners** to dynamically update the DOM
- Validating password strength using **regex & scoring logic**
- Using **Express.js APIs** to simulate authentication logic
- Deploying frontend to **Vercel** and backend to **Render**
- Working with **CORS, JSON**, and browser fetch API

---

## 🐞 Debugging Challenges Faced

| Issue | Solution |
|-------|----------|
| CORS error during fetch | Used `cors()` middleware in Express |
| Password strength bar not updating | Added `setTimeout()` to wait for DOM element render |
| Hash routes not changing UI | Ensured `hashchange` + `DOMContentLoaded` listeners were in place |
| Vercel + Render deployment not syncing | Updated frontend fetch URLs from `localhost` to live API endpoint |

---

## 📂 Folder Structure

/AUTHIFY-Smart-Auth-System
│
├── public/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ ├── server.js
│ └── package.json
  └── package-lock.json 


---

## 📦 How to Run Locally

### 🔧 Frontend

```bash
cd frontend
open index.html

⚙️ Backend
bash
Copy
Edit
cd backend
npm install
node server.js
Then visit: http://localhost:3000

---

## 🌟 Support & Contribute

If you found this project helpful or interesting:

- ⭐ **Star** this repo to show your support!
- 🍴 **Fork** it to explore and build your own version.
- 🛠️ **Contribute** by improving the code, fixing bugs, or adding features.

### 🤝 How to Contribute

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

All contributions are welcome! 🎉

---



