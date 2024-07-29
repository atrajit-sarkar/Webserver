from flask import Flask, request, jsonify
import mailtm
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Store received emails in a list
received_emails = []

@app.route('/generate-email', methods=['GET'])
def generate_email():
    try:
        global email
        email = mailtm.Email()
        email.register()
        return email.address
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear-emails', methods=['GET'])
def clear_emails():
    try:
        received_emails.clear()
        return 'Emails cleared'
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/start-listener', methods=['GET'])
def start_listener():
    try:
        # email = mailtm.Email()
        email.start(listener)
        return 'Email listener started'
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/fetch-emails', methods=['GET'])
def fetch_emails():
    try:
        return jsonify(received_emails)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def listener(message):
    global received_emails
    received_emails.append({
        'to' : message['to'][0]['address'],
        'from': message['from']['address'],
        'subject': message['subject'],
        'body': message['text'] if message['text'] else message['html']
    })
    return 'Email received'

if __name__ == '__main__':
    app.run(host='0.0.0.0/0',debug=True)