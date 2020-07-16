document.addEventListener('DOMContentLoaded', async (event) => {
    let id = document.getElementById('restaurantId').innerHTML


    //****create a div with a id of map in order for this to work!****
    if(document.querySelectorAll('#map').length > 0){
        // Create the script tag, set the appropriate attributes
        // const res = await fetch(`http://localhost:8082/api/key`)
        // const {key} = await res.json();


        var script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;
        script.type = "text/javascript";
        script.defer = true;
        script.async = true;
    }

    var map;
      // Create the script tag, set the appropriate attributes


      // Attach your callback function to the `window` object
       window.initMap = function() {
          // JS API is loaded and available
       };

      // Append the 'script' element to 'head'
      document.head.appendChild(script);
      script.addEventListener("load", ()=> {
        var options = {
            zoom: 10,
            //City of Chicago Coordinates below
            center:{lat:41.8781, lng:-87.6298}
        }
        //Creates new map and attaches to the div with id of map.
        map = new google.maps.Map(document.getElementById('map'), options)

        //Add marker function
        //Input object with format {lat: ###, lng:###} and adds marker to map created.
        function addMarker(coords){
            var marker = new google.maps.Marker({
            position: coords,
            map: map
            })
        }
        //do a for each restarurant, grab coordinates and add to a marker function invoked.

        fetch(`http://localhost:8082/api/${id}`).then((res) => res.json()).then(function(json){
            let {restaurant} = json;
            var {latitude, longitude } = restaurant;
            addMarker({lat: latitude, lng: longitude})
        })



      })



});
