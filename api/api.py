import time
from flask import Flask
from waitress import serve
import logging

logging.basicConfig(level = logging.DEBUG, format = '%(asctime)s %(message)s')

app = Flask(__name__, static_folder='../build', static_url_path="/")

@app.route('/') # simulate default filename when ends with /
def index():
    # return "hello world"
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time' : time.time()}

if __name__ == "__main__":
    serve(app, host = '127.0.0.1', port = 8085)