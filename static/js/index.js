// I'm doing things the old-fashioned way.
// Let's start by creating a JS 'object' that will hold all the 'props' and 'methods' we need.
// Note that this is not Object Oriented Programming. It's just the way people used to code JS 10+ years ago.
// The JS 'object' is nothing more than an associative array (or python dictionary)
hbnb = {
    destRadios: [],
    amenRadios: [],

    destRadiosInit: function() {
        // TODO:
    },
    amenRadiosInit: function() {
        // TODO:
    },
    init: function() {
        // 1. set up the onclick events for the Destinations radios
        hbnb.destRadiosInit();

        // 2. set up the onclick events for the Amenities radios + button
        // Note that the button will eat up the click event so the radio won't receive it.
        // Let's do something about that.
        hbnb.amenRadiosInit();
    }
}

window.onload = function() {
    // We add something to the web site to indicate that JS is active
    // otherwise a big scary message will appear
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("js", "ok");

    hbnb.init();
}