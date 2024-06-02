#!/usr/bin/python3

from flask import Flask, render_template
from api.v1 import api_routes

app = Flask(__name__)
app.register_blueprint(api_routes)

@app.route('/')
def index():
    """ Landing page for the site """
    # you MUST have a 'templates' folder
    return render_template('index.html')

@app.route('/status')
def status():
    """ Return server status """
    return 'OK'

# Set debug=True for the server to auto-reload when there are changes
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
