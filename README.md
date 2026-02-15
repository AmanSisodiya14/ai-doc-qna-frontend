# AI-Powered Document & Multimedia Q&A - Frontend

The frontend for the AI-Powered Document Q&A application. Built with React, Vite, and Tailwind CSS, it provides a responsive interface for uploading files, chatting with AI, and media playback.

## 🛠 Tech Stack

- **React 18.3**
- **Vite 5.4** (Build tool)
- **Redux Toolkit 2.2** (State management)
- **Tailwind CSS 3.4** (Styling)
- **Axios 1.7** (API Client)
- **React Router 6.26** (Navigation)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **Backend Running** - Ensure the Spring Boot backend is running on `http://localhost:8080`.

### Manual Setup

**1. Install Dependencies:**

Open a terminal in the `frontend` directory:

```bash
npm install
```

**2. Configure Environment (Optional):**

By default, the frontend connects to `http://localhost:8080`. If your backend is elsewhere, create a `.env` file:

```env
VITE_API_BASE_URL=http://your-backend-url:8080/api
```

**3. Start Development Server:**

```bash
npm run dev
```

The application will be accessible at: **http://localhost:5173**

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components (ChatWindow, VideoPlayer, etc.)
│   ├── pages/              # Main page views (Login, Dashboard, Chat)
│   ├── redux/              # Redux slices and store configuration
│   ├── services/           # Axios service modules (api.js, authService.js)
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🎓 User Workflow

1. **Register/Login**: Create an account or sign in.
2. **Dashboard**: View your uploaded files list.
3. **Upload**: Click "Upload" to add PDF, MP3, or MP4 files.
4. **Chat**: Click on a file to enter the chat interface.
   - Ask questions about the document content.
   - For video/audio, the answer will include timestamp links.
   - Click "Play" on an answer to jump to that timestamp in the media player.
5. **Summarize**: Use the summarize feature to get a quick overview of the document.

---

## scripts

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
