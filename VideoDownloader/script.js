const viddlerApiKey = 'YOUR_API_KEY_HERE';
const viddlerApiEndpoint = 'https://api.viddler.com/v1/';

function convertVideo() {
    const platform = document.getElementById('platform').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    startConversion(platform, videoUrl, format);
}

function startConversion(platform, videoUrl, format) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'block';

    const viddlerApiUrl = `${viddlerApiEndpoint}convert`;
    const headers = {
        'Authorization': `Bearer ${viddlerApiKey}`,
        'Content-Type': 'application/json'
    };
    const data = {
        'platform': platform,
        'video_url': videoUrl,
        'format': format
    };

    fetch(viddlerApiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const conversionId = data.conversion_id;
        simulateProgress(conversionId, progressBar);
    })
    .catch(error => console.error(error));
}

function simulateProgress(conversionId, progressBar) {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 5; // Increment progress
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${progress}%`;
        } else {
            clearInterval(interval);
            getDownloadLink(conversionId);
        }
    }, 500); // Update progress every 500ms
}

function getDownloadLink(conversionId) {
    const viddlerApiUrl = `${viddlerApiEndpoint}conversion/${conversionId}`;
    const headers = {
        'Authorization': `Bearer ${viddlerApiKey}`,
        'Content-Type': 'application/json'
    };

    fetch(viddlerApiUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        const downloadLink = data.download_link;
        displayDownloadLink(downloadLink);
    })
    .catch(error => console.error(error));
}

function displayDownloadLink(link) {
    const downloadLinkElement = document.getElementById('downloadLink');
    downloadLinkElement.href = link;
    downloadLinkElement.textContent = 'Download Converted File';
    downloadLinkElement.style.display = 'block';
}