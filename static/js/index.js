// I'm doing things the old-fashioned way.
// Let's start by creating a JS 'object' that will hold all the 'attributes' and 'methods' we need.
// Note that this is not Object Oriented Programming. It's just the way people used to code JS 10+ years ago.
// The JS 'object' is nothing more than an associative array (the proper name for a dictionary in Python)

// hbnb = {
// //     amenitiesInit: function() {
//         // set up the onclick events for the Amenities radios + button
//         let amenRadios = document.querySelectorAll("#menu >.contents >.amenities >.choice input[type='radio']");
//         for (let elem of amenRadios) {
//             elem.addEventListener("change", function(e) {
//             let specificSelectedText = document.querySelector("#menu >.contents >.amenities >.title .selected")
            
//                 let radioValue = e.target.value
//                 if (radioValue == 'specific') {
//                     hbnb.showSpecificAmenitiesSubmenu();
//                     hbnb.updateSpecificAmenitiesCount();
//                     specificSelectedText.setAttribute('state', 'show');
//                 } else {
//                     // all amenities - empty string
//                     hbnb.hideSpecificAmenitiesSubmenu()
//                     specificSelectedText.setAttribute('state', 'hide')
//                 }
//             });
//         }

//         let amenSpecificSelectBtn = document.getElementById("btn-specific-amenities-select");
//         amenSpecificSelectBtn.addEventListener('click', function() {
//             hbnb.showSpecificAmenitiesSubmenu()

//             // NOTE: simply clicking the Please Select button won't cause the radio to change
//             // The button eats up the click event so the label tag + radio won't receive it.
//             // We'll select the radio if it isn't already selected
//             if (!amenRadios[1].checked) {
//                 amenRadios[1].click();
//             }
//         });

//         // For the checkboxes in the submenu, let's add events that will update the counter
//         let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");
//         for (let c of selectedAmenitiesCheckboxes) {
//             c.addEventListener('click', function() {
//                 hbnb.updateSpecificAmenitiesCount();
//             })
//         }

//         // Last but not least! Now let's add an event to the OK button in the submenu
//         // Note that we are just hiding the menu and doing anything anything special
//         let amenSpecificConfirmBtn = document.getElementById("btn-specific-amenities-ok");
//         amenSpecificConfirmBtn.addEventListener('click', function(){
//             hbnb.hideSpecificAmenitiesSubmenu();
//         })

//     },
//     showSpecificAmenitiesSubmenu: function() {
//         // I have set up the CSS in a certain way so that the submenu is shown / hidden
//         // depending on the 'state' parameter's value in #amenities-submenu
//         let submenu = document.querySelector("#amenities-submenu")
//         submenu.setAttribute("state", 'show')
//     },
//     hideSpecificAmenitiesSubmenu: function() {
//         let submenu = document.querySelector("#amenities-submenu")
//         submenu.setAttribute("state", 'hide')
//     },
//     updateSpecificAmenitiesCount: function() {
//         let specificCount = document.querySelector("#menu >.contents >.amenities >.title .count")
//         let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");

//         let checkedCount = 0
//         for (let c of selectedAmenitiesCheckboxes) {
//             if (c.checked) {
//                 checkedCount++
//             }
//         }

//         specificCount.innerHTML = checkedCount
//     },
//     init: function() {
//         hbnb.amenitiesInit();
//     }
// }


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
            search_type: 'all_places_country',
            search_value: selectedCountry
        })
        .then(response => {
            // Update the results template with the received data
            this.updateResultsTemplate(response.data, 'country');

            // Render results.html within the #results section
            const resultsSection = document.getElementById('results');
            resultsSection.innerHTML = ''; // Clear previous results   
    
    
            // Assuming you have a template function to render results.html
            const resultsHtml = this.renderResultsTemplate(response.data);
            resultsSection.innerHTML = resultsHtml;
        })
        .catch(error => {
            console.error('Error fetching data by country:', error);
            this.renderErrorTemplate('No results found for the selected country.');
        });
    },
    

    filterResultsByCity: function(selectedCity) {
        axios.post('/', {
            search_type: 'city',
            search_value: selectedCity 
        })
            .then(response => {
                // Update the results template with the received data
                this.updateResultsTemplate(response.data, 'city');
                // Redirect to the results page after updating the template
                window.location.href = '/results'; 
            })
            .catch(error => {
                console.error('Error fetching data by city:', error);
                this.renderErrorTemplate('No results found for the selected city.');
            });
    },
    
    filterResultsByCountry: function(selectedCountry) {
        axios.post('/', {
            search_type: 'country',
            search_value: selectedCountry 
        })
            .then(response => {
                // Update the results template with the received data
                this.updateResultsTemplate(response.data, 'country');
            })
            .catch(error => {
                console.error('Error fetching data by country:', error);
                this.renderErrorTemplate('No results found for the selected country.');
            });
    },

    updateResultsTemplate: function(results, filterType) {
        const resultsContainer = document.getElementById('results_container');
        resultsContainer.innerHTML = '';  // Clear previous results
    
        // Iterate through the nested structure
        for (const countryName in results) {
            const countryData = results[countryName];
            for (const cityName in countryData) {
                const cityData = countryData[cityName];
    
                // Create elements to display the city and its places
                const countryHeading = document.createElement('h2');
                countryHeading.textContent = countryName;
                resultsContainer.appendChild(countryHeading);
    
                const cityHeading = document.createElement('h3');
                cityHeading.textContent = cityName;
                resultsContainer.appendChild(cityHeading);
    
                const placeList = document.createElement('ul');
                cityData.places.forEach(place => {
                    const placeItem = document.createElement('li');
                    placeItem.textContent = place.name; // Assuming the place has a name property
                    placeList.appendChild(placeItem);
                });
                resultsContainer.appendChild(placeList);
            }
        }
    },
    
    renderResultsTemplate: function(results) {
    let html = '<ul class="listings">';

    for (const countryName in results) {
        const countryData = results[countryName];
        html += `<li class="country_group">`;
        html += `<div class="country_name"><h1>${countryName}</h1></div>`;
        html += '<ul class="cities">';

        for (const cityName in countryData) {
            const cityData = countryData[cityName];
            html += `<li class="city_group">`;
            html += `<div class="city_name">${cityName}</div>`;
            html += '<ul>';

            cityData.forEach(place => {
                html += `<li class="place">`;
                // ... Add more HTML to display place details ...
                html += `</li>`;
            });

            html += '</ul>';
            html += `</li>`;
        }

        html += '</ul>';
        html += `</li>`;
    }

    html += '</ul>';
    return html;
},

    init: function() {
        hbnb.amenitiesInit();
        hbnb.destinationInit();
        hbnb.destinationSelectInit(); // Initialize the destination select functionality
    }
}


window.onload = function() {
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("js", "ok");

    hbnb.init();
    


    axios.get('/status')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


// So I'm pretty sure that you've all noticed that the code above is difficult to maintain.
// Just to access the radio inputs for Amenities, I had to use some crazy long selector string like:
// let amenRadios = document.querySelectorAll("#menu >.contents >.amenities >.choice input[type='radio']");
// What if someone changes the structure of the HTML? Updating the code would be terrifying!
// Think about what you all could do to make the code less annoying to update. Remind me to discuss this.