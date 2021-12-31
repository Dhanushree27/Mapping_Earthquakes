// Ensure file is being accessed
console.log("working");
// Assign city data from cities file to variable in this file
let cityData=cities;
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.0902,-95.7129], 4);

// Create a marker layer
cityData.forEach(city=> {
    L.circleMarker(city.location,{
        radius:city.population/100000,
        color:'orange',
        fillcolor:'orange',
        weight:4
    })
    .bindPopup("<b>City: </b>"+city.city+"<br><b>State: </b>"+city.state+"<br><b>Population: </b>"+city.population.toLocaleString())
    .addTo(map)
});


// We create the tile layer that will be the background of our map.
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);