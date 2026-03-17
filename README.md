# 🚀 Kishor Shelar — Premium Full-Stack Portfolio

A production-grade, visually stunning personal portfolio website built with React, Node.js, Express, and MongoDB. Designed to impress recruiters and tech companies instantly.

---

## ✨ Features

- 🎨 Premium dark UI with glassmorphism, gradient effects, and micro-interactions
- ⚡ Framer Motion animations — scroll-triggered, page transitions, hover effects
- 🖱️ Custom animated cursor with lagging ring
- 📊 Animated skill progress bars
- 🗂️ Filterable projects section
- 🌗 Dark / Light mode toggle
- 📱 Fully responsive (mobile-first)
- 🔐 Secure backend: JWT, Helmet, rate limiting, input sanitization
- 📬 Contact form with MongoDB storage
- 📜 Scroll progress indicator
- 🌐 SEO meta tags + Open Graph
- 🎭 Custom loading animation
- 💻 GitHub stats integration

---

## 📁 Project Structure

```
portfolio/
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html          # SEO-optimized HTML
│   └── src/
│       ├── animations/
│       │   └── variants.js     # Framer Motion reusable variants
│       ├── components/
│       │   ├── About/
│       │   ├── Contact/
│       │   ├── Cursor/
│       │   ├── Experience/
│       │   ├── Footer/
│       │   ├── GitHub/
│       │   ├── Hero/
│       │   ├── Loader/
│       │   ├── Navbar/
│       │   ├── Projects/
│       │   ├── Services/
│       │   ├── Skills/
│       │   └── Testimonials/
│       ├── hooks/
│       │   └── useScrollReveal.js
│       ├── styles/
│       │   └── globals.css     # CSS variables, base styles
│       ├── App.js
│       └── index.js
│
└── backend/                    # Node.js / Express API
    ├── config/
    ├── controllers/
    │   └── contactController.js
    ├── middleware/
    │   └── auth.js             # JWT middleware
    ├── models/
    │   ├── Contact.js
    │   └── Project.js
    ├── routes/
    │   ├── contact.js
    │   └── projects.js
    ├── utils/
    │   └── seedProjects.js
    ├── .env.example
    ├── package.json
    └── server.js
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/kishorshelar/portfolio.git
cd portfolio
```

---

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```



```bash
# Seed projects to MongoDB
npm run seed

# Start development server
npm run dev
```

The backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend runs on **http://localhost:3000**

> The React app proxies API calls to `http://localhost:5000` automatically (configured in `package.json`).

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/contact` | Submit contact form | Public |
| `GET` | `/api/contact` | Get all messages | JWT Required |
| `GET` | `/api/projects` | Get all projects | Public |
| `GET` | `/api/health` | Server health check | Public |

---

## 🔒 Security Features

| Feature | Library |
|---------|---------|
| Security headers | `helmet` |
| Rate limiting | `express-rate-limit` |
| NoSQL injection prevention | `express-mongo-sanitize` |
| XSS protection | `xss-clean` |
| JWT authentication | `jsonwebtoken` |
| Input validation | `validator` |
| CORS protection | `cors` |

---

## 🎨 Design Tokens

```css
--navy:          #0f172a   /* Primary background */
--electric-blue: #3b82f6   /* Accent color */
--cyan:          #22d3ee   /* Highlight / glow */
--font-display:  'Syne'    /* Headings */
--font-body:     'DM Sans' /* Body text */
--font-mono:     'JetBrains Mono' /* Code / labels */
```

---

## 🚀 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Upload build/ folder or connect GitHub repo to Vercel
```

### Backend → Railway / Render
1. Push backend to GitHub
2. Connect to Railway or Render
3. Add environment variables
4. Deploy

### MongoDB → Atlas
1. Create cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Get connection string
3. Update `MONGODB_URI` in production environment

---

## 📦 Dependencies

### Frontend
| Package | Purpose |
|---------|---------|
| `react` `react-dom` | UI framework |
| `framer-motion` | Animations |
| `react-type-animation` | Typing effect |
| `react-scroll` | Smooth scrolling |
| `react-router-dom` | Routing |
| `react-intersection-observer` | Scroll reveal |
| `axios` | HTTP client |
| `bootstrap` | CSS framework |
| `react-icons` | Icon library |

### Backend
| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `helmet` | Security headers |
| `cors` | Cross-origin requests |
| `jsonwebtoken` | JWT auth |
| `express-rate-limit` | Rate limiting |
| `express-mongo-sanitize` | NoSQL injection prevention |
| `xss-clean` | XSS protection |
| `validator` | Input validation |
| `dotenv` | Environment variables |

---

## 📝 Customization

To personalize this portfolio:

1. **Update personal info** in each component (name, email, GitHub handle, etc.)
2. **Add your projects** by editing `backend/utils/seedProjects.js` and re-seeding
3. **Replace resume** at `frontend/public/resume.pdf`
4. **Update GitHub username** in `GitHubActivity.jsx`
5. **Customize colors** in `frontend/src/styles/globals.css`

---

## 👨‍💻 Author

**Kishor Shelar**
- GitHub: [@kishorshelar](https://github.com/kishorshelar)
- LinkedIn: [linkedin.com/in/kishorshelar](https://linkedin.com/in/kishorshelar)
- Email: kishorshelar@gmail.com
- Location: Pune, India

---

## 📄 License

MIT License — free to use and modify for personal use.
