const USE_MOCK_AI = false; // Set to false to enable real AI integration (Level 2)
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === ''
    ? 'http://localhost:5000/api/generate'
    : 'https://ai-cover-letter-generator-sdvt.onrender.com/api/generate';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generator-form');
    const generateBtn = document.getElementById('generateBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const btnText = document.querySelector('.btn-text');
    const outputContent = document.getElementById('outputContent');
    const copyBtn = document.getElementById('copyBtn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Loading State
        setLoading(true);

        // Capture Inputs
        const formData = {
            candidateName: document.getElementById('candidateName').value,
            jobRole: document.getElementById('jobRole').value,
            companyName: document.getElementById('companyName').value,
            keySkills: document.getElementById('keySkills').value,
            jobDescription: document.getElementById('jobDescription').value
        };
        const resumeFile = document.getElementById('resumeUpload').files[0];

        try {
            let coverLetter = "";
            if (USE_MOCK_AI) {
                coverLetter = await generateMockCoverLetter(formData);
            } else {
                coverLetter = await generateRealCoverLetter(formData, resumeFile);
            }

            // Display Output
            displayOutput(coverLetter);

        } catch (error) {
            console.error(error);
            displayOutput(error.message || "Error generating cover letter. Please try again.");
        } finally {
            setLoading(false);
        }
    });

    copyBtn.addEventListener('click', () => {
        const text = outputContent.innerText;
        if (!text || outputContent.classList.contains('placeholder')) return;

        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                Copied!
            `;
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    function setLoading(isLoading) {
        if (isLoading) {
            generateBtn.disabled = true;
            loadingSpinner.classList.remove('hidden');
            btnText.textContent = "Generating...";
        } else {
            generateBtn.disabled = false;
            loadingSpinner.classList.add('hidden');
            btnText.textContent = "Generate Cover Letter";
        }
    }

    function displayOutput(text) {
        outputContent.classList.remove('placeholder');
        // Parse Markdown to HTML
        outputContent.innerHTML = marked.parse(text);
    }

    // Level 1: Mock AI Function
    function generateMockCoverLetter(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const template = `Dear Hiring Manager at ${data.companyName},

I am writing to express my strong interest in the ${data.jobRole} position at ${data.companyName}. With a strong background in ${data.keySkills}, I am confident in my ability to contribute effectively to your team.

${data.jobDescription ? `I was particularly drawn to this role because of the focus on: "${data.jobDescription.substring(0, 50)}..."` : ""}

My experience aligns well with the requirements of this role. I have consistently demonstrated my ability to deliver high-quality results and collaborate effectively with cross-functional teams.

Thank you for considering my application. I look forward to the possibility of discussing how my skills and experience can benefit ${data.companyName}.

Sincerely,
${data.candidateName}`;
                resolve(template);
            }, 1500); // Simulate API delay
        });
    }

    // Level 2 & 3: Real AI Function
    async function generateRealCoverLetter(data, file) {
        let body;
        let headers = {};

        if (file) {
            const formData = new FormData();
            formData.append('candidateName', data.candidateName);
            formData.append('jobRole', data.jobRole);
            formData.append('companyName', data.companyName);
            formData.append('keySkills', data.keySkills);
            formData.append('jobDescription', data.jobDescription);
            formData.append('resume', file);
            body = formData;
            // Content-Type header is not set manually for FormData to allow browser to calculate boundary
        } else {
            body = JSON.stringify(data);
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || `Server returned ${response.status}`);
        }

        const result = await response.json();
        return result.coverLetter;
    }
});
