// I'm doing things the old-fashioned way.
// Let's start by creating a JS 'object' that will hold all the 'props' and 'methods' we need.
// Note that this is not Object Oriented Programming. It's just the way people used to code JS 10+ years ago.
// The JS 'object' is nothing more than an associative array
hbnb = {
    amenitiesInit: function() {
        // set up the onclick events for the Amenities radios + button
        let amenRadios = document.querySelectorAll("#menu >.contents >.amenities >.choice input[type='radio']");
        for (elem of amenRadios) {
            elem.addEventListener("change", function(e) {
                let radioValue = e.target.value
                // console.log(radioValue)
                if (radioValue == 'specific') {
                    hbnb.showHideSpecificAmenitiesSubmenu('show');
                    hbnb.updateSpecificAmenitiesCount();
                } else {
                    // all amenities - empty string
                    hbnb.showHideSpecificAmenitiesSubmenu('hide');
                }
            });
        }

        // NOTE: simply clicking the Please Select button won't cause the radio to change
        // The button eats up the click event so the label tag + radio won't receive it.
        // I will need to use JS to trigger the click event on the radio when user clicks the button
        let amenSpecificSelectBtn = document.getElementById("btn-specific-amenities-select");
        amenSpecificSelectBtn.addEventListener('click', function() {
            amenRadios[1].click();
        });

        // For the checkboxes in the submenu, let's add events that will update the counter
        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");
        for (c of selectedAmenitiesCheckboxes) {
            c.addEventListener('click', function() {
                hbnb.updateSpecificAmenitiesCount();
            })
        }

        // Last but not least! Now let's add an event to the OK button in the submenu
        // Note that we are just hiding the menu and doing anything anything special
        let amenSpecificConfirmBtn = document.getElementById("btn-specific-amenities-ok");
        amenSpecificConfirmBtn.addEventListener('click', function(){
            hbnb.showHideSpecificAmenitiesSubmenu('hide');
        })

    },
    showHideSpecificAmenitiesSubmenu(state) {
        // I have set up the CSS in a certain way so that the submenu is shown / hidden
        // depending on the 'state' parameter's value in #amenities-submenu
        let submenu = document.querySelector("#amenities-submenu")
        submenu.setAttribute("state", state)
        
    },
    updateSpecificAmenitiesCount() {
        let specificCount = document.querySelector("#menu >.contents >.amenities >.title .count")
        let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']");

        let checkedCount = 0
        for (c of selectedAmenitiesCheckboxes) {
            if (c.checked) {
                checkedCount++
            }
        }

        specificCount.innerHTML = checkedCount
    },
    searchInit: function() {
        // NOTE: I have decided in the backend that an empty array means "all" / "anything"
        let searchBtn = document.getElementById("btn-menu-search")
        searchBtn.addEventListener('click', function() {
            data = {
                "destination": [],
                "amenities": []
            }

            // 1. Check the selected Destination radio and get the value
            // 2. Check the selected Amenities radio and get the value
            // 2.a. if the Specific radio is selected, scan the submenu checkboxes to get the values
            // 3. Finally, perform a POST request to the Search API endpoint

            // Steps 1 & 2
            let destRadioChoice = document.querySelector("#menu >.contents >.destination >.choice input[type='radio']:checked");
            let amenRadioChoice = document.querySelector("#menu >.contents >.amenities >.choice input[type='radio']:checked");
    
            if (destRadioChoice.value != "") {
                data.destination.push(destRadioChoice.value)
            }
            if (amenRadioChoice.value == "specific") {
                // Step 2a
                let selectedAmenitiesCheckboxes = document.querySelectorAll("#amenities-submenu >.items input[type='checkbox']:checked");
                for (c of selectedAmenitiesCheckboxes) {
                    data.amenities.push(c.value)
                }
            }

            console.log(data)
        })
    },
    init: function() {
        hbnb.amenitiesInit();
        hbnb.searchInit()
    }
}

window.onload = function() {
    // We add something to the web site to indicate that JS is active
    // otherwise a big scary message will appear
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("js", "ok");

    hbnb.init();
}