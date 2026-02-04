require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer'); // For Level 3
const pdfParse = require('pdf-parse'); // For Level 3

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Level 2 & 3: Generate Cover Letter
app.post('/api/generate', upload.single('resume'), async (req, res) => {
    try {
        const { candidateName, jobRole, companyName, keySkills, jobDescription } = req.body;
        let resumeText = "";

        // Level 3: PDF Parsing
        if (req.file) {
            try {
                const pdfData = await pdfParse(req.file.buffer);
                resumeText = pdfData.text;
                console.log("Resume parsed successfully:", resumeText.substring(0, 50) + "...");
            } catch (err) {
                console.error("PDF Parsing Error:", err);
                return res.status(400).json({ error: "Failed to parse PDF resume." });
            }
        }

        console.log(`Using credentials: ${process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) + '...' : 'MISSING'}`);

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Construct the prompt
        let promptContext = `
            Write a professional cover letter for ${candidateName} applying for the position of ${jobRole} at ${companyName}.
            The candidate has the following skills: ${keySkills}.
            
            Job Description:
            ${jobDescription}
        `;

        if (resumeText) {
            promptContext += `\n\nAdditional Candidate Background (from Resume): ${resumeText}\n\nInstruction: Use the candidate's background to personalize the letter significantly.`;
        }

        promptContext += `\n\nKeep the tone professional, concise, and persuasive. Avoid generic statements. Return ONLY the cover letter content.`;

        console.log("Sending request to Gemini...");
        const result = await model.generateContent(promptContext);
        const response = await result.response;
        const text = response.text();

        res.json({ coverLetter: text });

    } catch (error) {
        console.error("Error generating cover letter:", error);

        if (error.response && error.status === 429) {
            return res.status(429).json({ error: "Rate limit exceeded. Please wait a minute before trying again." });
        }

        // Handle GoogleGenerativeAIError structure where status might be inside response or top level
        if (error.status === 429 || (error.response && error.response.status === 429)) {
            return res.status(429).json({ error: "Rate limit exceeded (Quota full). Please wait a moment." });
        }

        res.status(500).json({ error: "Failed to generate: " + (error.message || "Unknown error") });
    }
});

// Level 3: Resume Upload Endpoint (Placeholder structure)
// We will implement this fully in Level 3 with multer
// app.post('/api/parse-resume', upload.single('resume'), ...);

// List models to debug
async function listModels() {
    try {
        /*
        // For older SDK versions or different import method, sometimes we might need this
        // But let's try the google-generative-ai way if specific method exists 
        // Actually, for @google/generative-ai, we might not have a direct listModels without an API setup
        // Let's rely on error message suggestion or try to run a known valid model test
        */
        console.log("Starting server...");
    } catch (e) {
        console.error("Error", e);
    }
}

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Using API Key: ${process.env.GEMINI_API_KEY ? '***********' : 'MISSING'}`);
});
