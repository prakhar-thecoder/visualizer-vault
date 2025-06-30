# Visualizer Vault Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)](https://www.mongodb.com/)

Backend server for Visualizer Vault, an interactive educational platform for visualizing algorithms and data structures. Built with Node.js, Express, and MongoDB.

## 🚀 Features

- RESTful API endpoints for visualizer data
- Admin panel for content management
- File upload handling with ImageKit integration
- Input validation with express-validator

## 📂 Project Structure

```
backend/
├── index.js              # Main server file
├── middleware/           # Custom middleware
│   └── auth.js          # Authentication middleware
├── routes/              # Route definitions
│   ├── adminRoutes.js   # Admin panel routes
│   └── apiRoutes.js     # API endpoints
├── templates/           # EJS templates for admin panel
│   ├── admin-dashboard.ejs
│   ├── admin-login.ejs
│   └── ...
└── utils/               # Utility functions
    ├── db.js           # Database connection
    └── imagekit.js     # Image upload handling
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/visualizer-vault.git
   cd visualizer-vault/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:3000`


## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
