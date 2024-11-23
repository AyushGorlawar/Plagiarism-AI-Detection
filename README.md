# Plagiarism-AI-Detection

# Plagiarism & AI Detection Tool

This is an advanced plagiarism and AI content detection tool that allows users to check the originality of their content and detect whether AI-generated text is present. The tool supports both text input and file uploads (e.g., `.txt`, `.doc`, `.pdf` files).

## Features

- **Plagiarism Detection**: Checks the content for any plagiarized material and calculates the plagiarism score.
- **AI Content Detection**: Identifies if the content is AI-generated.
- **File Upload Support**: Users can upload `.txt`, `.doc`, or `.pdf` files for analysis.
- **Word Limit**: The tool supports text with up to 6,000 words for checking.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: None (client-side processing)
- **Libraries**:
  - **PDF.js**: Used to extract text from PDF files.
  - **FileReader API**: For reading uploaded files.

## Installation

### Prerequisites

- **Web Browser**: Any modern web browser (Chrome, Firefox, etc.)
- **Internet**: The tool works offline for text analysis, but some external libraries may require internet for fetching resources.

### How to Use

1. **Input Text**: You can paste or write your content directly into the text area.
2. **Upload a File**: Alternatively, you can upload a `.txt`, `.doc`, or `.pdf` file for analysis.
3. **Click "Check Content"**: After entering the text or uploading a file, click the "Check Content" button to analyze the content.
4. **View Results**: The results will display the plagiarism score, uniqueness score, AI detection, and the most similar document.

## Demo

You can see a live demo of the tool at [https://ayushgorlawar.github.io/Plagiarism-AI-Detection/].

## Folder Structure
/project-directory 
├── index.html # Main HTML file 
├── style.css # Stylesheet for the webpage 
├── script.js # JavaScript for functionality 
├── README.md # Project documentation

