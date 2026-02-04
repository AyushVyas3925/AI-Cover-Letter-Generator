# Development Prompts & Journey

This document records the key prompts and interaction history with the AI assistant used to build the **AI Cover Letter Generator**. It demonstrates the iterative development process, from initial architectural planning to final UI polish and deployment.

---

## phase 1: Project Setup & Backend Architecture

**Goal**: Establish a robust Node.js server to handle API requests and file parsing.

1.  **Initial Server Setup**:
    > "I need to set up a backend for my web app using Node.js and Express. It needs to handle JSON data and file uploads. Can you help me scaffold the basic server structure using ES Modules (`import`/`export`)?"

2.  **Environment Configuration**:
    > "I'm using critical API keys for this project. How do I correctly set up a `.env` file and use `dotenv` to keep my Google Gemini API key secure?"

3.  **PDF Parsing Logic**:
    > "I need to extract text content from PDF files uploaded by users so I can pass it to the AI. Which Node.js library is best for this (e.g., `pdf-parse`), and can you show me a helper function to implement the extraction?"

---

## Phase 2: AI Integration (Google Gemini)

**Goal**: Integreate the Google Gemini Pro model to generate content.

4.  **Gemini API Connection**:
    > "I have my Google AI Studio API Key. How do I initialize the Google Generative AI client in my Node.js server and create a function to generate text based on a user's prompt?"

5.  **Prompt Engineering**:
    > "I need to construct a specific prompt for the AI. It should take a user's 'Job Role', 'Company Name', and their 'Resume Text' to write a professional cover letter. Help me design a template string for this."

---

## Phase 3: Frontend Development & UI Design

**Goal**: Create a modern, responsive user interface without relying on heavy frameworks.

6.  **UI Layout & Aesthetics**:
    > "I want to build a clean, modern interface for the Cover Letter Generator. I prefer a 'Glassmorphism' aesthetic with a dark/gradient background. Can you help me write the semantic HTML structure and the CSS for a glass-effect card container?"

7.  **Form interactions**:
    > "The form needs options for regular text input (Job Role) and a file upload area (Resume). How can I style a file input to look like a drag-and-drop zone using vanilla CSS?"

8.  **Client-Side Logic**:
    > "I need to send the form data (including the file) to my backend at `/api/generate`. Please assist with writing the specific `fetch` request using `FormData` to handle the multipart upload."

---

## Phase 4: Refinement & Optimization

**Goal**: Polish the user experience and fix bugs.

9.  **Loading States**:
    > "The AI takes a few seconds to generate the response. I want to add a loading spinner or animation to the submit button while the user waits. How can I toggle a specific class in JavaScript to show/hide this state?"

10. **Mobile Responsiveness**:
    > "The application looks good on desktop, but the layout breaks on mobile screens. Can we review the CSS Grid/Flexbox settings and add media queries to ensure the cards stack vertically on smaller devices?"

11. **Error Handling**:
    > "Sometimes the PDF text extraction fails. How can I improve the error handling in the backend to send a clear message back to the frontend if the file is corrupt or unreadable?"

---

## Phase 5: Documentation & Deployment

**Goal**: Prepare the project for public release.

12. **Project Documentation**:
    > "I'm writing the README.md. Help me structure it to include sections for Features, Tech Stack, Installation limits, and a clear 'How It Works' breakdown."

13. **Deployment Strategy**:
    > "I plan to host the frontend on Netlify and the backend on a separate service. What specific configuration (e.g., `_redirects` or CORS settings) do I need to ensure they can communicate securely?"
