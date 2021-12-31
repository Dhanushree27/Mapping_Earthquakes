// Ensure file is being accessed
console.log("working");
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.0902, -95.7129], 5);
// Create a line layer
let line=[
    [37.6213, -122.3790],
    [30.1975,-97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

L.polyline(line,
    {color:'blue',
    weight:4,
    opacity: 0.5,
    dashArray:'10'})
    .addTo(map);


// We create the tile layer that will be the background of our map.
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);