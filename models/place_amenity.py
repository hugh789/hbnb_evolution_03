#!/usr/bin/python
""" PlaceAmenity model """

import uuid
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from data import Base

class PlaceAmenity(Base):
    """Representation of place-amenity many-to-many table """

    datetime_format = "%Y-%m-%dT%H:%M:%S.%f"
    can_init_list = ["place_id", "amenity_id"]

    # Class attrib defaults
    __tablename__ = 'place_amenity'
    id = Column(String(60), nullable=False, primary_key=True)
    place_id = Column(String(60), ForeignKey('places.id'), nullable=False)
    amenity_id = Column(String(60), ForeignKey('amenities.id'), nullable=False)
    place_r = relationship("Place", back_populates="amenities_ids_r")
    amenity_r = relationship("Amenity", back_populates="places_ids_r")

    # constructor
    def __init__(self, *args, **kwargs):
        """ constructor """
        # Set object instance defaults
        self.id = str(uuid.uuid4())

        if kwargs:
            for key, value in kwargs.items():
                if key in self.can_init_list:
                    setattr(self, key, value)
