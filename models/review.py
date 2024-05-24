#!/usr/bin/python
""" Review model """

from datetime import datetime
import uuid
import re
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from data import storage, Base

class Review(Base):
    """Representation of review """

    can_init_list = ["place_id", "user_id", "rating", "comment"]

    # Class attrib defaults
    __tablename__ = 'reviews'
    id = Column(String(60), nullable=False, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())
    __place_id = Column(String(60), ForeignKey('places.id'), nullable=False)
    __user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    __rating = Column(Integer, nullable=False, default=0)
    __comment = Column(String(1024), nullable=False)

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