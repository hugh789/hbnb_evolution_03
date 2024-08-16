const hbnb = {
    init: function() {
        // Initialize amenities and destination functionality
        this.destinationInit();
        this.destinationSelectInit();
    },
    
  
    destinationInit: function() {
        // Set up the onclick events for the Destination radios + button
        const destRadios = document.querySelectorAll("#menu > .contents > .destination > .choice input[type='radio']");
        for (const elem of destRadios) {
            elem.addEventListener("change", function(e) {
                const specificSelectedText = document.querySelector("#menu > .contents > .destination > .title .selected");
                const radioValue = e.target.value;
                if (radioValue === 'specific') {
                    hbnb.showSpecificDestinationSubmenu();
                    hbnb.updateSpecificDestinationCount();
                    specificSelectedText.setAttribute('state', 'show');
                } else {
                    hbnb.hideSpecificDestinationSubmenu();
                    specificSelectedText.setAttribute('state', 'hide');
                }
            });
        }

        const selectedDestinationCheckboxes = document.querySelectorAll("#destination-submenu > .items input[type='checkbox']");
        for (const c of selectedDestinationCheckboxes) {
            c.addEventListener('click', function() {
                hbnb.updateSpecificDestinationCount();
            });
        }
    },

    showSpecificAmenitiesSubmenu: function() {
        const submenu = document.querySelector("#amenities-submenu");
        submenu.setAttribute("state", 'show');
    },

    hideSpecificAmenitiesSubmenu: function() {
        const submenu = document.querySelector("#amenities-submenu");
        submenu.setAttribute("state", 'hide');
    },

    updateSpecificAmenitiesCount: function() {
        const specificCount = document.querySelector("#menu > .contents > .amenities > .title .count");
        const selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu > .items input[type='checkbox']");

        let checkedCount = 0;
        for (const c of selectedAmenitiesCheckboxes) {
            if (c.checked) {
                checkedCount++;
            }
        }

        specificCount.innerHTML = checkedCount;
    },

    showSpecificDestinationSubmenu: function() {
        const submenu = document.querySelector("#destination-submenu");
        submenu.setAttribute("state", 'show');
    },

    hideSpecificDestinationSubmenu: function() {
        const submenu = document.querySelector("#destination-submenu");
        submenu.setAttribute("state", 'hide');
    },

    updateSpecificDestinationCount: function() {
        const specificCount = document.querySelector("#menu > .contents > .destination > .title .count");
        const selectedDestinationCheckboxes = document.querySelectorAll("#destination-submenu > .items input[type='checkbox']");

        let checkedCount = 0;
        for (const c of selectedDestinationCheckboxes) {
            if (c.checked) {
                checkedCount++;
            }
        }

        specificCount.innerHTML = checkedCount;
    },

    destinationSelectInit: function() {
        // Add event listeners to country elements
        const countryElements = document.querySelectorAll('.country');
        countryElements.forEach(function(countryElement) {
            countryElement.addEventListener('click', function() {
                const selectedCountry = this.getAttribute('data-country');
                console.log('Selected Country:', selectedCountry);
                // Call a function to filter results by selectedCountry
                hbnb.filterResultsByCountry(selectedCountry);
            });
        });

        // Add event listeners to city elements
        const cityElements = document.querySelectorAll('.city');
        cityElements.forEach(function(cityElement) {
            cityElement.addEventListener('click', function() {
                const selectedCity = this.getAttribute('data-city');
                console.log('Selected City:', selectedCity);
                // Call a function to filter results by selectedCity
                hbnb.filterResultsByCity(selectedCity);
            });
        });
    },

    filterResultsByCountry: function(selectedCountry) {
        axios.post('/', {
            search_type: 'country',
            search_value: selectedCountry
        })
        .then(response => {
            return response.data;
        })
        .then(data => {
            console.log(data);
            let results = "<ul class='listings'>";
    
            for (let countryName in data) {
                if (data.hasOwnProperty(countryName)) {
                    const countryData = data[countryName];
                    results += "<li class='country_group'>" +
                                    "<div class='country_name'>" +
                                        "<h1>" + countryName + "</h1>" +
                                    "</div>" +
                                    "<ul class='cities'>";
    
                    for (let cityName in countryData) {
                        if (countryData.hasOwnProperty(cityName)) {
                            const cityPlaces = countryData[cityName];
                            results += "<li class='city_group'>" +
                                            "<div class='city_name'>" + cityName + "</div>" +
                                            "<ul>";
    
                            // Check if cityPlaces.places is an array
                            if (Array.isArray(cityPlaces.place)) {
                                for (const place of cityPlaces.place) { 
                                    results += "<li class='place'>" +
                                                    "<div class='img " + countryName.toLowerCase() + "'></div>" +
                                                    "<div class='name'>" + place.name + "</div>" +
                                                    "<div class='details'>" +
                                                        "<div class='address' latitude='" + place.latitude + "' longitude='" + place.longitude + "'>" +
                                                            "<span class='text'>" + (place.address ? place.address.substring(0, 25) + '...' : '') + "</span>" + 
                                                        "</div>" +
                                                        "<div class='price'>" +
                                                            "<strong class='price_per_night'>$" + place.price_per_night + "</strong>" +
                                                            "<span class='pax'>per night</span>" +
                                                        "</div>" +
                                                        "<div class='accommodations'>" +
                                                            "<span class='rooms'><i class='fa-solid fa-house'></i>" + place.number_of_rooms + "</span>" +
                                                            "<span class='bathrooms'><i class='fa-solid fa-bath'></i>" + place.number_of_bathrooms + "</span>" +
                                                            "<span class='guests'><i class='fa-solid fa-person'></i>" + place.max_guests + "</span>" +
                                                        "</div>" +
                                                    "</div>" +
                                                "</li>";
                                }
                            } else {
                                console.warn(`cityPlaces.places is not an array:`, cityPlaces.place);
                            }
    
                            results += "</ul>" +
                                       "</li>";
                        }
                    }
    
                    results += "</ul>" +
                               "</li>";
                }
            }
    
            results += "</ul>";
    
            document.querySelector("#results").innerHTML = results;
        })
        .catch(error => console.error("Error fetching places:", error));
    },

    filterResultsByCity: function(selectedCity) {
        // Implement filtering by city if needed
    }
};

window.onload = function() {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("js", "ok");

    hbnb.init();

    axios.get('/status')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
};