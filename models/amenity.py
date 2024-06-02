#!/usr/bin/python
""" Amenity model """

from datetime import datetime
import uuid
import re
from flask import jsonify, request, abort
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from data import storage, Base

class Amenity(Base):
    """Representation of amenity """

    datetime_format = "%Y-%m-%dT%H:%M:%S.%f"
    can_init_list = ["name"]
    can_update_list = ["name"]

    # Class attrib defaults
    __tablename__ = 'amenities'
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    __name = Column("name", String(128), nullable=False)
    places_ids_r = relationship("PlaceAmenity", back_populates="amenity_r")

    # constructor
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
            raise ValueError("Invalid amenity name specified: {}".format(value))

    # --- Static methods ---
    @staticmethod
    def all(returnRawResult=False):
        """ Class method that returns all amenities data"""
        output = []

        try:
            result = storage.get('Amenity')
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to load amenities!"

        if returnRawResult:
            return result

        for row in result:
            output.append({
                "id": row.id,
                "name": row.name,
                "created_at": row.created_at.strftime(Amenity.datetime_format),
                "updated_at": row.updated_at.strftime(Amenity.datetime_format)
            })

        return jsonify(output)

    @staticmethod
    def specific(amenity_id):
        """ Class method that returns a specific amenity's data"""
        try:
            result: Amenity = storage.get('Amenity', 'id', amenity_id)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to load Amenity data!"

        output = {
            "id": result[0].id,
            "name": result[0].name,
            "created_at": result[0].created_at.strftime(Amenity.datetime_format),
            "updated_at": result[0].updated_at.strftime(Amenity.datetime_format)
        }

        return jsonify(output)

    @staticmethod
    def create():
        """ Class method that creates a new amenity"""
        if request.get_json() is None:
            abort(400, "Not a JSON")

        data = request.get_json()
        if 'name' not in data:
            abort(400, "Missing name")

        exists = storage.get('Amenity', '_Amenity__name', data["name"])
        if exists is not None:
            abort(400, "Specified amenity already exists")

        try:
            new_amenity = Amenity(
                name=data["name"]
            )
        except ValueError as exc:
            return repr(exc) + "\n"

        try:
            storage.add(new_amenity)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to add new Amenity!"

        output = {
            "id": new_amenity.id,
            "name": new_amenity.name,
            "created_at": new_amenity.created_at.strftime(Amenity.datetime_format),
            "updated_at": new_amenity.updated_at.strftime(Amenity.datetime_format)
        }

        return jsonify(output)

    @staticmethod
    def update(amenity_id):
        """ Class method that updates an existing amenity"""
        if request.get_json() is None:
            abort(400, "Not a JSON")

        data = request.get_json()

        try:
            # update the Amenity record. Only name can be changed
            result = storage.update('Amenity', amenity_id, data, Amenity.can_update_list)
        except IndexError as exc:
            print("Error: ", exc)
            return "Unable to update specified amenity!"

        output = {
            "id": result.id,
            "name": result.name,
            "country_id": result.country_id,
            "created_at": result.created_at.strftime(Amenity.datetime_format),
            "updated_at": result.updated_at.strftime(Amenity.datetime_format)
        }

        return jsonify(output)
