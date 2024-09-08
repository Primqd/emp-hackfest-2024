import time
import requests
from flask import Flask
from waitress import serve
import logging

logging.basicConfig(level = logging.DEBUG, format = '%(asctime)s %(message)s')

app = Flask(__name__, static_folder='../build', static_url_path="/")

def mdy_to_ymd(date : str) -> str:
    """
    converts the date from MM-DD-YYYY into YYYY-MM-DD
    """
    k = date.split('-')
    if len(k[0]) > len(k[1]): return date # already in format??
    return f"{k[2]}-{k[0]}-{k[1]}"

def ymd_to_mdy(date : str) -> str:
    """
    Converts the given date from the year-month-day format into the month-day-year format.
    """
    k = date.split('-')
    return f"{k[1]}-{k[2]}-{k[0]}"

@app.route('/') # simulate default filename when ends with /
def index():
    # return "hello world"
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_time():
    return {'time' : time.time()}

@app.route('/api/asteroids/<start_date>/<end_date>')
def get_asteroids(start_date = "2021-09-07", end_date = "09-08-2021", api_key = "CnR6bUincjYICWgqU9O9e0kE3yRpsYeMa1NWoW8F"):
    response = {"asteroid_info":[]}
    
    url = "https://api.nasa.gov/neo/rest/v1/feed?"
    url += f"start_date={start_date}&end_date={end_date}&api_key={api_key}"
    info = requests.get(url).json()
    for date in info['near_earth_objects']:
        for asteroids in info['near_earth_objects'][date]:
            asteroid_info={}
            asteroid_info['id'] = asteroids['id']
            asteroid_info['name'] = asteroids['name']
            asteroid_info['diameter'] = (asteroids['estimated_diameter']['meters']['estimated_diameter_min'] + asteroids['estimated_diameter']['meters']['estimated_diameter_max'])/2
            asteroid_info['hazardous'] = asteroids['is_potentially_hazardous_asteroid']
            asteroid_info['orbiting_body'] = asteroids["close_approach_data"][0]['orbiting_body']
            asteroid_info['distance'] = asteroids["close_approach_data"][0]['miss_distance']['kilometers']
            asteroid_info['close_approach'] = ymd_to_mdy(asteroids["close_approach_data"][0]['close_approach_date'])
            response["asteroid_info"].append(asteroid_info)
    return response
    

if __name__ == "__main__":
    serve(app, host = '127.0.0.1', port = 8085)