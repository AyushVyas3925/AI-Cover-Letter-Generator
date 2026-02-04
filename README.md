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

### 2. Deploy Frontend (to Netlify via GitHub)
Since your frontend is in a subfolder (`client`), follow these exact steps to enable Continuous Deployment:

1.  **Push your code** to GitHub.
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** -> **"Import from existing project"**.
4.  Select **GitHub** and authorize it.
5.  Pick your repository (**ai-cover-letter-generator**).
6.  **Configure Build Settings**:
    *   **Base directory**: (Leave empty)
    *   **Build command**: (Leave empty)
    *   **Publish directory**: `client`
7.  Click **Deploy**.

**Why this works**: Netlify will watch your repo. When you push changes to GitHub, Netlify will automatically "publish" the contents of the `client` folder to your live URL.
