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

// Create a group layer
let earthquakes=new L.layerGroup();

// Create the overlay layer
let overlays={
    Earthquakes:earthquakes
};

// Add the layer group to the map
L.control.layers(baseMaps,overlays).addTo(map);

// Custome function to define the style data for the map
function styleInfo(feature){
    return {
        opacity:1,
        fillOpacity:1,
        fillColor:getColor(feature.properties.mag),
        color:"#000000",
        radius:getRadius(feature.properties.mag),
        stroke:true,
        weight:0.5
    };
}

// Function to determine the color
function getColor(mag){
    if (mag > 5) {
        return "#ea2c2c";
      }
      if (mag > 4) {
        return "#ea822c";
      }
      if (mag > 3) {
        return "#ee9c00";
      }
      if (mag > 2) {
        return "#eecc00";
      }
      if (mag > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
}

// Function to determine the radius
function getRadius(mag){
    if (mag===0){
        return 1;
    }
    return mag*4;
}

// Read the earthquakes from the link and add it to the earthquakes variable defined earlier, then add the variable to the map
let link="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(link).then(data=>{
    L.geoJSON(data,{
        // Add each earthquake as circle marker
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng);            
            },
        // Apply custom styling using the functions defined above
        style:styleInfo,
        // Add pop up to each marker
        onEachFeature: function(feature,layer){
            layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place)
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
})

