function convertVideo() {
    const platform = document.getElementById('platform').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    // Start the conversion process (this is a simulation)
    startConversion(platform, videoUrl, format);
}

function startConversion(platform, videoUrl, format) {
    // Simulate conversion progress
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.createElement('span');
    progressBar.appendChild(progressText);

    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 5; // Increment progress
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;
        } else {
            clearInterval(interval);
            // Conversion is complete, generate download link
            const convertedFileLink = `https://example.com/converted-file.${format}`;
            displayDownloadLink(convertedFileLink);
        }
    }, 500); // Update progress every 500ms
}

function displayDownloadLink(link) {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = link;
    downloadLink.textContent = 'Download Converted File';
    downloadLink.style.display = 'block';
}
