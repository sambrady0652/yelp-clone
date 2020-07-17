import { handleErrors } from './utils.js';
//Thanks to Ian Wright for the solution 
document.addEventListener('DOMContentLoaded', async (event) => {
    //Retreive api key
    const res = await fetch(`/api/key`)
    const { key } = await res.json();

    //create Script element and assign its attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;
    script.type = "text/javascript";
    script.defer = true;
    script.async = true;

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    window.initMap = function () { };

    //Event listener telling script to run after page load 
    script.addEventListener("load", async () => {
        //Select Default Zoom and Coordinates
        const options = {
            zoom: 10,
            center: { lat: 41.8781, lng: -87.6298 }
        };
        //Creates new map instance and attaches to the div with id of map.
        const map = new google.maps.Map(document.getElementById('map'), options)
        //Creates markers on map
        function addMarker(coords) {
            const marker = new google.maps.Marker({
                position: coords,
                map: map
            })
        };

        //Retreive Search Results as array of Restaurants after search button is clicked 
        const searchForm = document.querySelector(".search_function");
        searchForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(searchForm)
            const keyword = formData.get("keyword");
            try {
                const res = await fetch(`/api/search`, {
                    method: "POST",
                    body: JSON.stringify({ keyword }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw res;
                }

                const { restaurants } = await res.json();

                const searchResults = document.getElementById("search_results");
                //Add Markers to the map for each restaurant in the restaurants array
                for (let restaurant in restaurants) {
                    const { id, image_url, name, latitude, longitude } = restaurants[restaurant];
                    //Create New Restaurant List Item
                    const newRestaurant = document.createElement('li');
                    newRestaurant.setAttribute("id", `restaurant${id}`);
                    //Create Link to Restaurant Page
                    const newLink = document.createElement('a');
                    newLink.setAttribute('href', `restaurants/${id}`);
                    //Create Text to Click 
                    const restaurantContent = document.createTextNode(`${name}`);
                    //Connect Text to Link, Link to List Item, List Item to List
                    newLink.appendChild(restaurantContent);
                    newRestaurant.appendChild(newLink);
                    searchResults.append(newRestaurant);
                    //Create Map Marker for each Restaurant
                    addMarker({ lat: Number(latitude), lng: Number(longitude) });
                    // Include InfoWindow for each marker(WORK IN PROGRESS)
                    const infoWindow = new google.maps.InfoWindow();
                    const infoWindowContent = `<div class="info_content"><h3>${name}</h3>`
                }
            }
            catch (err) {
                handleErrors(err);
            }
        });
    });
});



// var bounds = new google.maps.LatLngBounds();


// // Multiple Markers
// var markers = [
//     ['London Eye, London', 51.503454, -0.119562],
//     ['Palace of Westminster, London', 51.499633, -0.124755]
// ];

// // Info Window Content
// var infoWindowContent = [
//     ['<div class="info_content">' +
//         '<h3>London Eye</h3>' +
//         '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' + '</div>'],
//     ['<div class="info_content">' +
//         '<h3>Palace of Westminster</h3>' +
//         '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//         '</div>']
// ];

// // Display multiple markers on a map
// var infoWindow = new google.maps.InfoWindow(), marker, i;

// // Loop through our array of markers & place each one on the map  
// for (i = 0; i < markers.length; i++) {
//     var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//     bounds.extend(position);
//     marker = new google.maps.Marker({
//         position: position,
//         map: map,
//         title: markers[i][0]
//     });

//     // Allow each marker to have an info window    
//     google.maps.event.addListener(marker, 'click', (function (marker, i) {
//         return function () {
//             infoWindow.setContent(infoWindowContent[i][0]);
//             infoWindow.open(map, marker);
//         }
//     })(marker, i));

//     // Automatically center the map fitting all markers on the screen
//     map.fitBounds(bounds);
// }

// // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
// var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
//     this.setZoom(14);
//     google.maps.event.removeListener(boundsListener);
// });
