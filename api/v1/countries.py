""" objects that handles all default RestFul API actions for Country """
from api.v1 import api_routes
from models.country import Country

@api_routes.route('/countries', methods=["POST"])
def countries_post():
    """ posts data for new country then returns the country data"""
    # -- Usage example --
    # curl -X POST [URL] /
    #    -H "Content-Type: application/json" /
    #    -d '{"key1":"value1","key2":"value2"}'

    return Country.create()

@api_routes.route('/countries', methods=["GET"])
def countries_get():
    """ returns countires data """
    return Country.all()

@api_routes.route('/countries/<country_code>', methods=["GET"])
def countries_specific_get(country_code):
    """ returns specific country data """
    return Country.specific(country_code)

@api_routes.route('/countries/<country_code>', methods=["PUT"])
def countries_put(country_code):
    """ updates existing user data using specified id """
    # -- Usage example --
    # curl -X PUT [URL] /
    #    -H "Content-Type: application/json" /
    #    -d '{"key1":"value1","key2":"value2"}'

    # can only update name
    return Country.update(country_code)

@api_routes.route('/countries/<country_code>/cities', methods=["GET"])
def countries_specific_cities_get(country_code):
    """ returns cities data of specified country """

    # Here is an example of how model relationships can be used to extract data in addition to enforcing foreign keys
    # It is literally be a replacement for my implementation of the Country.cities method
    # Unfortunately, we still need to do cleanup of the data that is returned
    # 
    # from data import storage
    # data = []
    # country_data = storage.get('Country', '_Country__code', country_code)
    # city_data = country_data[0].cities_r
    # for v in city_data:
    #     data.append({
    #         "id": v.id,
    #         "name": v.name,
    #         "country_id": v.country_id,
    #         "created_at":v.created_at.strftime(Country.datetime_format),
    #         "updated_at":v.updated_at.strftime(Country.datetime_format)
    #     })
    # return data

    return Country.cities(country_code)
