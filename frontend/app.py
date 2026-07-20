from flask import Flask, render_template, request, make_response
from redis import Redis
import os, socket

app = Flask(__name__)
# Connects to the Redis tier using K8s internal DNS hostname 'redis'
redis = Redis(host="redis", port=6379, db=0)

@app.route("/", methods=['POST','GET'])
def hello():
    voter_id = request.cookies.get('voter_id')
    if not voter_id: voter_id = os.urandom(16).hex()

    vote = None
    if request.method == 'POST':
        vote = request.form['vote']
        redis.rpush('votes', vote) # Push vote into Redis queue named 'votes'
        
    resp = make_response(render_template(
        'index.html', option_a="Docker", option_b="Kubernetes", hostname=socket.gethostname()
    ))
    resp.set_cookie('voter_id', voter_id)
    return resp

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)