// Ensure file is being accessed
console.log("working");
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};



// Create a geoJSON layer
/*L.geoJSON(sanFranAirport,{
    pointToLayer:function(feature,latlng){
        return L.marker(latlng)
        .bindPopup("<h2>"+feature.properties.name+"</h2><hr><h3>"+feature.properties.city+" ,"+feature.properties.country+"</h3>")
    }
})
.addTo(map);*/

// Create a geoJSON layer with onEachFeature popups
/*L.geoJSON(sanFranAirport,{
    onEachFeature:function(feature,layer){
        console.log(layer)
        layer.bindPopup("<h3>Airport code: "+feature.properties.faa+"</h3><hr><h3>Airport Name: "+feature.properties.name+"</h3>")
    }
}).addTo(map);*/

// We create the tile layers that will be the background of our map.
let streets=L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let dark= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Basemap variable to hold both maps
let baseMaps={
    Streets:streets,
    Dark:dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center:[30,30],
    zoom:2,
    layers:[streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a geoJSON layer by reading from a URL. 
let airportData="https://raw.githubusercontent.com/Dhanushree27/Mapping_Earthquakes/main/majorAirports.json"
d3.json(airportData).then(airport=>{
    L.geoJSON(airport,{
        onEachFeature:function(feature,layer){
            layer.bindPopup("<h3>Airport code: "+feature.properties.faa+"</h3><hr><h3>Airport Name: "+feature.properties.name+"</h3>")
        }
    }).addTo(map)
});
