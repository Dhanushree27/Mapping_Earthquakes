// Ensure file is being accessed
console.log("working");
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522,-118.2437], 14);
// Create a marker layer
//let marker=L.marker([34.0522,-118.2437]).addTo(map);
// Create a circle layer
let circle=L.circleMarker([34.0522,-118.2437], {
    radius:300,
    color:'black',
    fillColor:'yellow',
    fillopacity:0.1
}).addTo(map);

// We create the tile layer that will be the background of our map.
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);