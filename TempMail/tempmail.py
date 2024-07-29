from mailtm import Email

def listener(message):
    print(f"Sent from: Name: {message['from']['name']} \n email: {message['from']['address']}")
    print("\nSubject: " + message['subject'])
    print("Content: " + (message['text'] if message['text'] else message['html']))

email = Email()
print("\nDomain: " + email.domain)
email.register()  # Make a new email address
print("\nEmail Address: " + str(email.address))
# test.start(listener)  # Start listening for new emails
# test.stop()

while True:
    email.start(listener)
    print("\nWaiting for new emails...")
    button=input("")
    
    if button=="q":
        email.stop()
        break
    