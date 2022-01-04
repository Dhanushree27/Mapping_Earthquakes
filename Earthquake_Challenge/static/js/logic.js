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

let navigationNight= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Basemap variable to hold both maps
let baseMaps={
    Streets:streets,
    Satellite:satelliteStreets,
    "Night Navigation": navigationNight
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center:[39.5,-98.5],
    zoom:3,
    layers:[streets]
});

// Create group layers for earthquakes, tectonic plates and major earthquakes
let earthquakes=new L.layerGroup();
let tectonicPlates=new L.layerGroup();
let majorEarthquakes=new L.layerGroup();


// Create the overlay layer
let overlays={
    "Categories":{
    Earthquakes:earthquakes,
    "Major Earthquakes":majorEarthquakes},
    "Tectonic Plates":{
        "Tectonic Plates":tectonicPlates,
    }
};  

var options={exclusiveGroups:["Categories"]}
// Add the layer group to the map
L.control.groupedLayers(baseMaps,overlays,options).addTo(map);

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
let eLink="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(eLink).then(data=>{
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
// Creating a custom legend and adding it to the map
// Defining the position of the legend
var legend = L.control({position: 'bottomright'});
// Creating a legend with all the details
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend'),
        maginitudes = [0,1,2,3,4,5],
        colors = [ 
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"];
    div.innerHTML="<b>Magnitude <br></b>";
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < maginitudes.length; i++) {
        console.log(colors[i])
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            maginitudes[i] + (maginitudes[i + 1] ? '&ndash;' + maginitudes[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(map);


// Read the tectonic plates from the link and add it to the tectonic plates variable defined earlier, then add the variable to the map
let tLink="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
d3.json(tLink).then(data=>{
    L.geoJSON(data,{
        dashArray:'10,5',
        color:'red',
        weight:2
    }).addTo(tectonicPlates);
    tectonicPlates.addTo(map);
    
})
// Read the major earthquakes from the link and add it to the major earthquakes variable defined earlier, then add the variable to the map
let meLink="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
d3.json(meLink).then(data=>{
    function styleInfoMaj(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColorMaj(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
    // Create a different color function for different intervals
    function getColorMaj(mag){
      return  mag>6 ? '#a31300':
              mag>5 ? '#ea2c2c': '#ea822c'
    }
    L.geoJSON(data,{
        style:styleInfoMaj,
        pointToLayer:function(feature,latlng){
            return L.circleMarker(latlng,{ radius:feature.properties.mag})
            .bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place)
        }
    }).addTo(majorEarthquakes);
    // majorEarthquakes.addTo(map);
})
// Creating a custom legend for major earthquakes and adding it to the map
// Defining the position of the legend
var meLegend = L.control({position: 'bottomright'});
// Creating a legend with all the details
meLegend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend'),
        maginitudes = [4.5,5,6],
        colors = [ 
        "#ea822c",
        "#ea2c2c",
        "#a31300"];
    div.innerHTML="<b>Major<br> Earthquakes<br></b>";
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < maginitudes.length; i++) {
        console.log(colors[i])
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            maginitudes[i] + (maginitudes[i + 1] ? '&ndash;' + maginitudes[i + 1] + '<br>' : '+');
    }
    return div;
};
// meLegend.addTo(map);

// Add legend if earthquakes layer is selected
map.on('overlayadd', function (eventLayer) {
    // Switch to the Population legend...
    if (eventLayer.name === 'Earthquakes') {
        legend.addTo(this);
    }else if(eventLayer.name === 'Major Earthquakes'){
        meLegend.addTo(this);
    }
})

// Remove legend if earthquakes layer is selected
map.on('overlayremove', function (eventLayer) {
    // Switch to the Population legend...
    if (eventLayer.name === 'Earthquakes') {
        this.removeControl(legend);
    }else if(eventLayer.name === 'Major Earthquakes'){
        this.removeControl(meLegend);
    }
})