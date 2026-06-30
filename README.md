# 🏢 LeaveDesk – HR Employee Leave Management Tool

A professional HR leave management web app built with React.

## ✨ Features

- 📊 **Dashboard** – Stats overview (Total / Approved / Pending / Rejected)
- 📋 **Leave Requests** – Full table with filter by Employee & Status
- 👥 **Employees** – Per-employee leave breakdown cards
- ➕ **Apply Leave Form** – With validation and auto day count
- ✅ **Approve / Reject** – One-click status updates
- 🔔 **Toast Notifications** – Instant feedback on actions

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/hr-leave-management.git
cd hr-leave-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm start
```

Opens at `http://localhost:3000`

### 4. Build for production
```bash
npm run build
```

## 🛠 Tech Stack

- React 18
- Inline CSS (no extra libraries needed)
- Pure JavaScript (no TypeScript)

## 📁 Project Structure

```
hr-leave-management/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── HRLeaveManagement.jsx   ← Main component
├── .gitignore
├── package.json
└── README.md
```

## 🌐 Deploy to GitHub Pages (optional)

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/hr-leave-management",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

---
Made with ❤️ using React
