// Max word limit set to 6,000 words
const MAX_WORD_COUNT = 6000;

// Function to preprocess text
function preprocessText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
}

// Function to check word count
function checkWordCount(text) {
    const wordCount = text.split(/\s+/).length;
    return wordCount <= MAX_WORD_COUNT;
}

// Function to extract text from uploaded files
async function extractTextFromFile(file) {
    try {
        if (file.name.endsWith(".txt")) {
            // Read text file
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (error) => reject("Error reading the file: " + error);
                reader.readAsText(file);
            });
        } else if (file.name.endsWith(".pdf")) {
            // Read PDF file
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onload = async (e) => {
                    try {
                        const pdfData = e.target.result;
                        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
                        let text = "";
                        for (let i = 0; i < pdf.numPages; i++) {
                            const page = await pdf.getPage(i + 1);
                            const pageText = await page.getTextContent();
                            text += pageText.items.map((item) => item.str).join(" ");
                        }
                        resolve(text);
                    } catch (error) {
                        reject("Error extracting text from PDF: " + error);
                    }
                };
                reader.onerror = (error) => reject("Error reading the PDF file: " + error);
                reader.readAsArrayBuffer(file);
            });
        } else {
            return "Unsupported file type.";
        }
    } catch (error) {
        console.error("File extraction failed:", error);
        return "An error occurred during file extraction.";
    }
}

// Mock function to simulate plagiarism checking (replace with real API in production)
async function checkContent(text) {
    // Simulate a fake plagiarism check with random scores (you'd replace this with an actual API call)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                plagiarismScore: Math.floor(Math.random() * 100),  // Random plagiarism score
                uniquenessScore: 100 - Math.floor(Math.random() * 100),  // Random uniqueness score
                aiDetection: "AI-generated text: " + (Math.random() > 0.5 ? "Yes" : "No"),
                mostSimilarDocument: "Example document with similar content."
            });
        }, 1000);  // Simulate a delay of 1 second (replace with real API call)
    });
}

// Event listener for the check button
document.getElementById("checkBtn").addEventListener("click", async () => {
    try {
        const inputText = document.getElementById("inputText").value;
        const fileInput = document.getElementById("fileInput").files[0];
        let textToCheck = inputText;

        if (!inputText && fileInput) {
            textToCheck = await extractTextFromFile(fileInput);
            if (textToCheck.includes("Error")) {
                document.getElementById("result").innerHTML = textToCheck;
                return;
            }
        } else if (!inputText && !fileInput) {
            document.getElementById("result").innerHTML = "Please enter text or upload a file.";
            return;
        }

        // Check if the word count exceeds the limit
        if (!checkWordCount(textToCheck)) {
            document.getElementById("result").innerHTML = `Text exceeds the ${MAX_WORD_COUNT} word limit. Please shorten your text.`;
            return;
        }

        // Use the mock checkContent function to simulate plagiarism check
        const result = await checkContent(textToCheck);

        document.getElementById("result").innerHTML = `
            <strong>Plagiarism Score:</strong> ${result.plagiarismScore}%<br>
            <strong>Uniqueness Score:</strong> ${result.uniquenessScore}%<br>
            <strong>AI Detection:</strong> ${result.aiDetection}<br>
            <strong>Most Similar Document:</strong> ${result.mostSimilarDocument}
        `;
    } catch (error) {
        console.error("An error occurred:", error);
        document.getElementById("result").innerHTML = "An error occurred during processing. Please try again.";
    }
});
