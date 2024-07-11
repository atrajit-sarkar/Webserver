import ollama from 'ollama';

// Function to handle asking questions
async function askQuestion() {
    const questionInput = document.getElementById('questionInput');
    const question = questionInput.value;
    const responseSection = document.getElementById('responseSection');

    try {
        const response = await ollama.chat({
            model: 'llama2', // Replace with the appropriate model name
            messages: [{ role: 'user', content: question }]
        });

        // Display the AI's response
        responseSection.innerHTML = `<p>${response.message.content}</p>`;
    } catch (error) {
        console.error('Error:', error);
        responseSection.innerHTML = `<p>Sorry, an error occurred while getting the response.</p>`;
    }
}

// Function to handle image generation
async function generateImage() {
    const imagePrompt = document.getElementById('imagePrompt');
    const prompt = imagePrompt.value;
    const responseSection = document.getElementById('responseSection');

    try {
        const response = await ollama.generate({
            model: 'llama2', // Replace with the appropriate model name
            prompt: prompt
        });

        // Assuming the response contains a URL to the generated image
        responseSection.innerHTML = `<img src="${response.url}" alt="Generated Image">`;
    } catch (error) {
        console.error('Error:', error);
        responseSection.innerHTML = `<p>Sorry, an error occurred while generating the image.</p>`;
    }
}

// Event listeners for buttons
document.getElementById('askBtn').addEventListener('click', askQuestion);
document.getElementById('generateBtn').addEventListener('click', generateImage);

