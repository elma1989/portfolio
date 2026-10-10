from flask import Flask, request
from mail import send_request, send_confirm

app = Flask(__name__)

@app.post('/contact')
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    question = data.get('question')

    if not name: return {'status': 400, 'msg': 'Name missing.'}, 400
    if not email: return {'status': 400, 'msg': 'E-Mail missing'}, 400
    if not question: return {'status': 400, 'msg': 'Question missing'}, 400

    send_request(name, email, question)
    send_confirm(name, email)
    
    return {'status': 200, 'msg': 'successful'}, 200