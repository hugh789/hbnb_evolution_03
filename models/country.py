#!/usr/bin/python
""" Country model """

from datetime import datetime
import uuid
import re
from flask import jsonify, request, abort
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from data import storage, Base
from models.city import City

class Country(Base):
    """Representation of country """

    datetime_format = "%Y-%m-%dT%H:%M:%S.%f"
    can_init_list = ["name", "code"]
    can_update_list = ["name"]

    # Class attrib defaults
    __tablename__ = 'countries'
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    __name = Column("name", String(128), nullable=False)
    __code = Column("code", String(2), nullable=False)
    cities_r = relationship("City", back_populates="country_r", cascade="delete, delete-orphan")

    # Constructor
    def __init__(self, *args, **kwargs):
        """ constructor """
        # Set object instance defaults
        self.id = str(uuid.uuid4())

        # Note that setattr will call the setters for attribs in the list
        if kwargs:
            for key, value in kwargs.items():
                if key in self.can_init_list:
                    setattr(self, key, value)

    # --- Getters and Setters ---
    @property
    def name(self):
        """Getter for private prop name"""
        return self.__name

    @name.setter
    def name(self, value):
        """Setter for private prop name"""

        # ensure that the value is not spaces-only and is alphabets + spaces only
        is_valid_name = len(value.strip()) > 0 and re.search("^[a-zA-Z ]+$", value)
        if is_valid_name:
            self.__name = value
        else:
            raise ValueError("Invalid country name specified: {}".format(value))

    @property
    def code(self):
        """Getter for private prop code"""
        return self.__code

    @code.setter
    def code(self, value):
        """Setter for private prop code"""

        # ensure that the value is not spaces-only and is two uppercase alphabets only
        is_valid_code = len(value.strip()) > 0 and re.search("^[A-Z][A-Z]$", value)
        if is_valid_code:
            self.__code = value
        else:
            raise ValueError("Invalid country code specified: {}".format(value))

    # --- Static methods ---
    @staticmethod
    def all():
        """ Class method that returns all countries data"""
        data = []

        try:
            country_data = storage.get('Country')
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to load countries!"

        for row in country_data:
            data.append({
                "id": row.id,
                "name": row.name,
                "code": row.code,
                "created_at": row.created_at.strftime(Country.datetime_format),
                "updated_at": row.updated_at.strftime(Country.datetime_format)
            })

        return jsonify(data)

    @staticmethod
    def specific(country_code):
        """ Class method that returns a specific country's data"""
        try:
            country_data: Country = storage.get('Country', '_Country__code', country_code)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to load Country data!"

        c = {
            "id": country_data[0].id,
            "name": country_data[0].name,
            "code": country_data[0].code,
            "created_at": country_data[0].created_at.strftime(Country.datetime_format),
            "updated_at": country_data[0].updated_at.strftime(Country.datetime_format)
        }

        return jsonify(c)

    @staticmethod
    def create():
        """ Class method that creates a new country"""
        if request.get_json() is None:
            abort(400, "Not a JSON")

        data = request.get_json()
        if 'name' not in data:
            abort(400, "Missing name")
        if 'code' not in data:
            abort(400, "Missing country code")

        exists = storage.get('Country', '_Country__code', data["code"])
        if exists is not None:
            return "New country's code is the same as that of an existing country!"

        try:
            new_country = Country(
                name=data["name"],
                code=data["code"]
            )
        except ValueError as exc:
            return repr(exc) + "\n"

        try:
            storage.add('Country', new_country)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to add new Country!"

        output = {
            "id": new_country.id,
            "name": new_country.name,
            "code": new_country.code,
            "created_at": new_country.created_at.strftime(Country.datetime_format),
            "updated_at": new_country.updated_at.strftime(Country.datetime_format)
        }

        return jsonify(output)

    @staticmethod
    def update(country_code):
        """ Class method that updates an existing country"""
        if request.get_json() is None:
            abort(400, "Not a JSON")

        data = request.get_json()

        country_data: Country = storage.get('Country', '_Country__code', country_code)
        if country_data is None:
            abort(400, "Country not found for code {}".format(country_code))

        try:
            # update the Country record. Only name can be changed
            result = storage.update('Country', country_data.id, data, Country.can_update_list)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to update specified country!"

        output = {
            "id": result.id,
            "name": result.name,
            "code": result.code,
            "created_at": result.created_at.strftime(Country.datetime_format),
            "updated_at": result.updated_at.strftime(Country.datetime_format)
        }

        return jsonify(output)

    @staticmethod
    def cities(country_code):
        """ Class method that returns a specific country's cities"""
        data = []

        # If the column is mapped to a private variable, the attr name is mangled like below
        try:
            country_data: Country = storage.get('Country', '_Country__code', country_code)
            city_data: City = storage.get('City', '_City__country_id', country_data[0].id)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to load Country data!"

        for v in city_data:
            data.append({
                "id": v.id,
                "name": v.name,
                "country_id": v.country_id,
                "created_at":v.created_at.strftime(Country.datetime_format),
                "updated_at":v.updated_at.strftime(Country.datetime_format)
            })

        return jsonify(data)
