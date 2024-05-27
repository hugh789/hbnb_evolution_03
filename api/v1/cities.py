""" objects that handles all default RestFul API actions for City """
from api.v1 import api_routes
from models.city import City

@api_routes.route('/api/v1/cities', methods=["GET"])
def cities_get():
    """ get data for all cities """
    return City.all()

@api_routes.route('/api/v1/cities', methods=["POST"])
def cities_post():
    """ posts data for new city then returns the city data"""
    # -- Usage example --
    # curl -X POST [URL] /
    #    -H "Content-Type: application/json" /
    #    -d '{"key1":"value1","key2":"value2"}'

    return City.create()

@api_routes.route('/api/v1/cities/<city_id>', methods=["GET"])
def cities_specific_get(city_id):
    """ returns specific city data """
    return City.specific(city_id)

@api_routes.route('/api/v1/cities/<city_id>', methods=["PUT"])
def cities_put(city_id):
    """ updates existing city data using specified id """
    return City.update(city_id)