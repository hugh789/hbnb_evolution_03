#!/usr/bin/python3

from flask import Flask, render_template, request, abort, jsonify
from api.v1 import api_routes
from models.city import City
from models.country import Country
from models.place_amenity import Place, Amenity
from models.review import Review
from models.user import User
from sqlalchemy.orm import Session
import json
from data import storage 

app = Flask(__name__)
app.register_blueprint(api_routes)

@app.route('/')
def index():
    """ Landing page for the site """
    # you MUST have the 'templates' and 'static' folders

    # Load the data we need before passing it to the template
    countries = Country.all(True)
    amenities = Amenity.all(True)
    destination = Country.destination()

    return render_template('index.html', countries=countries, amenities=amenities, destination=destination)


@app.route("/", methods=["POST"])
def results():
    countries = Country.all(True)
    amenities = Amenity.all(True)
    places_to_cities_countries = Place.all(True)
    places_by_country = Place.all(True)
    data = json.loads(request.data.decode('utf-8'))
    search_type = data['search_type']
    search_value = data['search_value']
    print(f"Received search_type: {search_type}, search_value: {search_value}")

    if search_type == 'country':
        results = Place.places_to_cities_countries(search_value, search_type)  
    elif search_type == 'city':
        results = Place.places_to_cities_countries(search_value, search_type)  
    elif search_type == 'all_places_country':
        results = Place.places_by_country(search_value, search_type)
    print(results)

    # Render results.html with the fetched data
    rendered_results = render_template('results.html', places=results, countries=countries, places_to_cities_countries=places_to_cities_countries, places_by_country=places_by_country) 

    return rendered_results # Return the rendered HTML content
    """
            else:
                return jsonify({"error": "Invalid search type"}), 400

            # Log the results for debugging
            print(f"Filtered results: {results}")

            return render_template('results.html', results=results, search_value=search_value)

        except (json.JSONDecodeError, KeyError) as e:
            app.logger.error(f"Error decoding JSON or accessing data: {e}")
            return jsonify({"error": "Invalid request data"}), 400

        except Exception as e:
            app.logger.error(f"Error in results route: {e}")
            return jsonify({"error": "Internal Server Error"}), 500 """


        

@app.route('/admin')
def admin():
    """ Admin page """

    # Load the data we need before passing it to the template
    cities = City.all(True)
    countries = Country.all(True)
    places = Place.all(True)
    amenities = Amenity.all(True)
    reviews = Review.all(True)
    users = User.all(True)
    place_amenity = Place.amenities_data()

    return render_template('admin.html',
                           place_amenity=place_amenity,
                           cities=cities,
                           countries=countries,
                           places=places,
                           amenities=amenities,
                           reviews=reviews,
                           users=users)

@app.route('/admin', methods=["POST"])
def admin_post():
    """ Handle the form data posted in the admin page """

    # Evaluate what was submitted from the frontend and return the appropriate results
    if request.form is None:
        abort(400, "No form data submitted")

    formdata = request.form
    submit_data = formdata.to_dict()

    model = ""
    data = {}
    for key in submit_data:
        keys = key.split('-')
        model = keys[0]
        data[keys[1]] = submit_data[key]

    result = 'OK' #default
    if model == 'country':
        result = Country.create_from_form_submit(data)
    elif model == 'pa':
        result = Amenity.create_place_relationship(data)

    if result != 'OK':
        return result

    # Load the data we need before passing it to the template
    cities = City.all(True)
    countries = Country.all(True)
    places = Place.all(True)
    amenities = Amenity.all(True)
    reviews = Review.all(True)
    users = User.all(True)
    place_amenity = Place.amenities_data()

    return render_template('admin.html',
                           place_amenity=place_amenity,
                           cities=cities,
                           countries=countries,
                           places=places,
                           amenities=amenities,
                           reviews=reviews,
                           users=users)

@app.route('/status')
def status():
    """ Return server status """
    return 'hello  world'

# Set debug=True for the server to auto-reload when there are changes
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
