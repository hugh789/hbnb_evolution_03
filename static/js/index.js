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
        .then(response => response.data)
        .then(data => {
            console.log(data);
            let results = "<ul class='listings'>";

            // Generate HTML content for results
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
                                                   "</div>" +
                                                   "<div class='accommodations'>" +
                                                       "<span class='rooms'><i class='material-icons md-18'>cottage</i>" + place.number_of_rooms + "</span>" +
                                                       "<span class='bathrooms'><i class='material-icons'>shower</i>" + place.number_of_bathrooms + "</span>" +
                                                       "<span class='guests'><i class='material-icons'>person</i>" + place.max_guests + "</span>" +
                                                   "</div>" +
                                               "</li>";
                                }
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
            results += "<div id='map'></div>";

            document.querySelector("#results").innerHTML = results;
            feather.replace();

            // Convert data to GeoJSON format for Mapbox
            const geojsonData = {
                type: "FeatureCollection",
                features: []
            };

            for (let countryName in data) {
                const countryData = data[countryName];
                for (let cityName in countryData) {
                    const cityPlaces = countryData[cityName].place;
                    for (const place of cityPlaces) {
                        geojsonData.features.push({
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [place.longitude, place.latitude]
                            },
                            properties: {
                                name: place.name,
                                address: place.address,
                                price_per_night: place.price_per_night,
                                number_of_rooms: place.number_of_rooms,
                                number_of_bathrooms: place.number_of_bathrooms,
                                max_guests: place.max_guests
                            }
                        });
                    }
                }
            }

            // Initialize Mapbox
            mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94aGJuYiIsImEiOiJjbTAwZmNsd3gxMHpiMmxvcmlhN3FsamIyIn0.rGEekbo8oWjQEQeqkVD1Pg';
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [101.715, 3.15395], // Example center point
                zoom: 10
            });

            map.on('load', function() {
                map.addSource('places', {
                    type: 'geojson',
                    data: geojsonData,
                    cluster: true,
                    clusterMaxZoom: 14,
                    clusterRadius: 50
                });

                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'places',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            10,
                            '#f1f075',
                            100,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            10,
                            30,
                            100,
                            40
                        ]
                    }
                });

                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'places',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                });

                map.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'places',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff'
                    }
                });

                // Add click event to zoom into clusters
                map.on('click', 'clusters', function(e) {
                    const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
                    const clusterId = features[0].properties.cluster_id;
                    map.getSource('places').getClusterExpansionZoom(clusterId, function(err, zoom) {
                        if (err) return;

                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    });
                });

                // Add click event to individual points
                map.on('click', 'unclustered-point', function(e) {
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const { name, address, price_per_night } = e.features[0].properties;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`<strong>${name}</strong><br/>${address}<br/>Price: $${price_per_night}/night`)
                        .addTo(map);
                });

                // Change cursor to pointer when over clusters and points
                map.on('mouseenter', 'clusters', function() {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', 'clusters', function() {
                    map.getCanvas().style.cursor = '';
                });
                map.on('mouseenter', 'unclustered-point', function() {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', 'unclustered-point', function() {
                    map.getCanvas().style.cursor = '';
                });
            });
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