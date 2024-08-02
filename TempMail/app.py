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
    email_body = message['text'] if message['text'] else message['html']
    button_text = None
    button_link = None

    # Check if the email body is HTML
    if 'html' in message and message['html']:
        email_body = message['html']
        # Parse HTML to find button link and text
        if '<a href="' in email_body:
            start_index = email_body.index('<a href="') + len('<a href="')
            end_index = email_body.index('"', start_index)
            button_link = email_body[start_index:end_index]

            button_text_start = email_body.index('>', start_index) + 1
            button_text_end = email_body.index('</a>', button_text_start)
            button_text = email_body[button_text_start:button_text_end]

    received_emails.append({
        'to': message['to'][0]['address'],
        'from': message['from']['address'],
        'subject': message['subject'],
        'body': email_body,
        'button': {
            'text': button_text,
            'link': button_link
        } if button_text and button_link else None
    })
    return 'Email received'

if __name__ == '__main__':
    app.run(debug=True)
