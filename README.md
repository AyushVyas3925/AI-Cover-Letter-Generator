# Mission 4: AI Cover Letter Generator

A full-stack AI application that generates professional cover letters using Google Gemini API.

## 🚀 Features
- **Smart Generation**: Uses Google Gemini Pro to write personalized letters.
- **Resume Upload**: Parses PDF resumes to extract skills and experience (Level 3).
- **Premium UI**: Responsive, glassmorphism-inspired design.
- **Secure Architecture**: Backend-only API handling.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API
- **Tools**: `pdf-parse`, `multer`

## 🌍 Deployment Guide

### 1. Deploy Backend (e.g., to Render.com)
The backend is a Node.js app.
1. Push this code to GitHub.
2. Go to [Render](https://render.com) -> New -> Web Service.
3. Connect your repo.
4. Set **Root Directory** to `server`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `node server.js`.
7. **Important**: Add your `GEMINI_API_KEY` in the Environment Variables section.
8. Copy your new Backend URL (e.g., `https://my-app.onrender.com`).

### 2. Deploy Frontend (to Netlify)
The frontend is static HTML/CSS/JS.
1. Go to `client/script.js`.
2. Update the `API_URL` const to your Render URL.
3. Drag and drop the `client` folder into Netlify.
