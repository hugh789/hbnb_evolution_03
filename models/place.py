#!/usr/bin/python
""" Place model """

from datetime import datetime
import uuid
import re
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from data import storage, Base

class Place(Base):
    """Representation of place """

    can_init_list = ["city_id", "host_id", "name", "description", "number_rooms", "number_bathrooms", "max_guest", "price_by_night", "latitude", "longitude"]

    # Class attrib defaults
    __tablename__ = 'places'
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    __city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    __host_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    __name = Column(String(128), nullable=False)
    __description = Column(String(1024), nullable=True)
    __address = Column(String(1024), nullable=True)
    __number_of_rooms = Column(Integer, nullable=False, default=0)
    __number_of_bathrooms = Column(Integer, nullable=False, default=0)
    __max_guests = Column(Integer, nullable=False, default=0)
    __price_per_night = Column(Integer, nullable=False, default=0)
    __latitude = Column(Float, nullable=True)
    __longitude = Column(Float, nullable=True)
    # reviews = relationship("Review", backref="place", cascade="all, delete, delete-orphan")
    # amenities = relationship("Amenity", secondary=place_amenity, viewonly=False)

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

    # TODO: add methods