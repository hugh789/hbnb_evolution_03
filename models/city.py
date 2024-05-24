#!/usr/bin/python
""" City model """

from datetime import datetime
import uuid
import re
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from data import storage, Base

class City(Base):
    """Representation of city """

    can_init_list = ["country_id", "name"]

    # Class attrib defaults
    __tablename__ = 'cities'
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    __name = Column("name", String(128), nullable=False)
    __country_id = Column("country_id", String(128), ForeignKey('countries.id'), nullable=False)
    country_r = relationship("Country", back_populates="cities_r")

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
            raise ValueError("Invalid city name specified: {}".format(value))

    @property
    def country_id(self):
        """Getter for private prop country_id"""
        return self.__country_id

    @country_id.setter
    def country_id(self, value):
        """Setter for private prop country_id"""
        # the foreign key relation will ensure that the specified country id actually exists before setting it, right?
        if storage.get('Country', value) is not None:
            self.__country_id = value
        else:
            raise ValueError("Invalid country_id specified: {}".format(value))

    # TODO: add methods