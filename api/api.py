import time
import requests
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

@app.route('/api/asteroids')
def get_asteroids(start_date = "2021-09-07", end_date = "2021-09-08", api_key = "CnR6bUincjYICWgqU9O9e0kE3yRpsYeMa1NWoW8F"):
    response = {asteroid_info:[]}
    
    url = "https://api.nasa.gov/neo/rest/v1/feed?"
    url += f"start_date={start_date}&end_date={end_date}&api_key={api_key}"
    info = requests.get(url).json()
    for asteroids in info['near_earth_objects'][start_date]:
        asteroid_info={}
        asteroid_info[asteroids['id']] = asteroids['id']
        asteroid_info[asteroids['name']] = asteroids['name']
        asteroid_info[asteroids['diameter']] = (asteroids['estimated_diameter']['meters']['estimated_diameter_min'] + asteroids['estimated_diameter']['meters']['estimated_diameter_max'])/2
        asteroid_info[asteroids['hazardous']] = asteroids['is_potentially_hazardous_asteroid']
        asteroid_info[asteroids['orbiting_body']] = asteroids['orbiting_body']
        response[asteroid_info].append(asteroid_info)
    return response
    

if __name__ == "__main__":
    serve(app, host = '127.0.0.1', port = 8085)