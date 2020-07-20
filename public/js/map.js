document.addEventListener('DOMContentLoaded', async (event) => {
    let id = document.getElementById('restaurantId').innerHTML
    if (document.querySelectorAll('#map').length > 0) {
        const res = await fetch(`/api/key`)
        const { key } = await res.json();


        //Create the script tag, set the appropriate attributes
        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;
        script.type = "text/javascript";
        script.defer = true;
        script.async = true;
    }

    var map;
    // Attach callback function to the `window` object
    window.initMap = function () {
        // JS API is loaded and available
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    script.addEventListener("load", () => {
        var options = {
            zoom: 10,
            //City of Chicago Coordinates
            center: { lat: 41.8781, lng: -87.6298 }
        }
        //Creates new map and attaches to the div with id of map.
        map = new google.maps.Map(document.getElementById('map'), options)

        //function to add marker to position on map
        function addMarker(coords) {
            var marker = new google.maps.Marker({
                position: coords,
                map: map
            })
        }
        //Invokes function, adds marker 
        fetch(`/api/${id}`).then((res) => res.json()).then(function (json) {
            let { restaurant } = json;
            var { latitude, longitude } = restaurant;
            addMarker({ lat: Number(latitude), lng: Number(longitude) })
        });
    });
});
