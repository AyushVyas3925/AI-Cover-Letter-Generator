const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Listing models...");
        // Current SDK doesn't expose listModels directly on the main class in all versions
        // But we can try to hit the model endpoint or just test generation on common names

        const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

        for (const modelName of modelsToTest) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you there?");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} is working. Response: ${response.text()}`);
                process.exit(0); // Exit on first success
            } catch (error) {
                console.log(`FAILED: ${modelName}. Error: ${error.message}`);
            }
        }

        console.log("All models failed.");
    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
