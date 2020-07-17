import { handleErrors } from './utils.js';

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
            return new google.maps.Marker({
                position: coords,
                map: map
            })
        };

        //Retreive Search Results as array of Restaurants after search button is clicked 
        const searchForm = document.querySelector(".nav_search-form");
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

                const restaurants = await res.json();
                //Add Markers to the map for each restaurant in the restaurants array
                for (let restaurant in restaurants) {
                    const { latitude, longitude } = restaurant;
                    addMarker({ lat: latitude, lng: longitude });
                }
            }
            catch (err) {
                handleErrors(err);
            }
        });
    });
});
