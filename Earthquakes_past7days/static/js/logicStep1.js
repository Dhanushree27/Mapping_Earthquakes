// Ensure file is being accessed
console.log("working");
// Create the tile layers that will be the background of our map.
let streets=L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Basemap variable to hold both maps
let baseMaps={
    Streets:streets,
    Satellite:satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center:[39.5,-98.5],
    zoom:3,
    layers:[streets]
});

// Add the layer group to the map
L.control.layers(baseMaps).addTo(map);

// Variable defining style for the earthquakes
let myStyle={
    color:'blue',
    fillColor:'yellow',
    weight:2}


// Add the earthquakes
let earthquakes="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(earthquakes).then(data=>{
    L.geoJSON(data).addTo(map);
})