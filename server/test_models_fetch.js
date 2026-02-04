require('dotenv').config();

async function checkModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("API Key missing in .env");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log(`Checking API access for key: ${apiKey.substring(0, 8)}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`Response body: ${text}`);
            return;
        }

        const data = await response.json();
        console.log("Success! Available models:");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found in response.");
            console.log(JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

checkModels();
