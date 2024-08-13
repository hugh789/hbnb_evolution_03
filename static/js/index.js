hbnb = {
    amenitiesInit: function() {
        // set up the onclick events for the Amenities radios + button
        let amenRadios = document.querySelectorAll("#menu > .contents > .amenities > .choice input[type='radio']");
        for (let elem of amenRadios) {
            elem.addEventListener("change", function(e) {
                let specificSelectedText = document.querySelector("#menu > .contents > .amenities > .title .selected");
                let radioValue = e.target.value;
                if (radioValue == 'specific') {
                    hbnb.showSpecificAmenitiesSubmenu();
                    hbnb.updateSpecificAmenitiesCount();
                    specificSelectedText.setAttribute('state', 'show');
                } else {
                    hbnb.hideSpecificAmenitiesSubmenu();
                    specificSelectedText.setAttribute('state', 'hide');
                }
            });
        }

        let amenSpecificSelectBtn = document.getElementById("btn-specific-amenities-select");
        amenSpecificSelectBtn.addEventListener('click', function() {
            hbnb.showSpecificAmenitiesSubmenu();
            if (!amenRadios[1].checked) {
                amenRadios[1].click();
            }
        });

        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu > .items input[type='checkbox']");
        for (let c of selectedAmenitiesCheckboxes) {
            c.addEventListener('click', function() {
                hbnb.updateSpecificAmenitiesCount();
            });
        }

        let amenSpecificConfirmBtn = document.getElementById("btn-specific-amenities-ok");
        amenSpecificConfirmBtn.addEventListener('click', function() {
            hbnb.hideSpecificAmenitiesSubmenu();
        });
    },

    destinationInit: function() {
        // set up the onclick events for the Destination radios + button
        let destRadios = document.querySelectorAll("#menu > .contents > .destination > .choice input[type='radio']");
        for (let elem of destRadios) {
            elem.addEventListener("change", function(e) {
                let specificSelectedText = document.querySelector("#menu > .contents > .destination > .title .selected");
                let radioValue = e.target.value;
                if (radioValue == 'specific') {
                    hbnb.showSpecificDestinationSubmenu();
                    hbnb.updateSpecificDestinationCount();
                    specificSelectedText.setAttribute('state', 'show');
                } else {
                    hbnb.hideSpecificDestinationSubmenu();
                    specificSelectedText.setAttribute('state', 'hide');
                }
            });
        }

        let selectedDestinationCheckboxes = document.querySelectorAll("#destination-submenu > .items input[type='checkbox']");
        for (let c of selectedDestinationCheckboxes) {
            c.addEventListener('click', function() {
                hbnb.updateSpecificDestinationCount();
            });
        }
    },

    showSpecificAmenitiesSubmenu: function() {
        let submenu = document.querySelector("#amenities-submenu");
        submenu.setAttribute("state", 'show');
    },

    hideSpecificAmenitiesSubmenu: function() {
        let submenu = document.querySelector("#amenities-submenu");
        submenu.setAttribute("state", 'hide');
    },

    updateSpecificAmenitiesCount: function() {
        let specificCount = document.querySelector("#menu > .contents > .amenities > .title .count");
        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu > .items input[type='checkbox']");

        let checkedCount = 0;
        for (let c of selectedAmenitiesCheckboxes) {
            if (c.checked) {
                checkedCount++;
            }
        }

        specificCount.innerHTML = checkedCount;
    },

    showSpecificDestinationSubmenu: function() {
        let submenu = document.querySelector("#destination-submenu");
        submenu.setAttribute("state", 'show');
    },

    hideSpecificDestinationSubmenu: function() {
        let submenu = document.querySelector("#destination-submenu");
        submenu.setAttribute("state", 'hide');
    },

    updateSpecificDestinationCount: function() {
        let specificCount = document.querySelector("#menu > .contents > .destination > .title .count");
        let selectedDestinationCheckboxes = document.querySelectorAll("#destination-submenu > .items input[type='checkbox']");

        let checkedCount = 0;
        for (let c of selectedDestinationCheckboxes) {
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
            let results = "";
            for (let countryName in data) {
                if (data.hasOwnProperty(countryName)) {
                    const countryData = data[countryName];
                    results += "<div> \
                        <h1>" + countryName + "</h1> \
                        <div>Stuff goes here</div> \
                    </div>";
                }
            }
            document.querySelector("#results").innerHTML = results;
        })
        .catch(error => console.error("Error fetching places:", error));
    }
};

window.onload = function() {
    let body = document.getElementsByTagName("body")[0];
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
