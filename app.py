#!/usr/bin/python3

from flask import Flask, render_template
from api.v1 import api_routes
from models.country import Country
from models.amenity import Amenity

app = Flask(__name__)
app.register_blueprint(api_routes)

@app.route('/')
def index():
    """ Landing page for the site """
    # you MUST have the 'templates' and 'static' folders

    # Load the data we need before passing it to the template
    countries = Country.all(True)
    amenities = Amenity.all(True)
    country_city_places = Country.places()

    return render_template('index.html', countries=countries, amenities=amenities, places=country_city_places)

@app.route('/status')
def status():
    """ Return server status """
    return 'OK'

# Set debug=True for the server to auto-reload when there are changes
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
