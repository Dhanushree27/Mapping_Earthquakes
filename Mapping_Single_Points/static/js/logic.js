// Ensure file is being accessed
console.log("working");
// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);
// We create the tile layer that will be the background of our map.
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);