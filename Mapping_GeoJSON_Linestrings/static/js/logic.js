// Ensure file is being accessed
console.log("working");
// Create the tile layers that will be the background of our map.
let night=L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let day= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Basemap variable to hold both maps
let baseMaps={
    NightNavigation:night,
    DayNavigation:day
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center:[44,-80],
    zoom:2,
    layers:[night]
});

// Add the layer group to the map
L.control.layers(baseMaps).addTo(map);

// Variable defining style for the routes
let myStyle={
    color:'lightyellow',
    weight:2}


// Add the routelines
let routes="https://raw.githubusercontent.com/Dhanushree27/Mapping_Earthquakes/main/torontoRoutes.json"
d3.json(routes).then(route=>{
    L.geoJSON(route,{
        style:myStyle,
        onEachFeature:function(feature,layer){
            layer.bindPopup("<h3>Airline Code: "+feature.properties.airline+"</h3><hr><h3>Destination: "+feature.properties.dst)
        }
    }).addTo(map);
})