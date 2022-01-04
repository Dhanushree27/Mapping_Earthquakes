# Mapping Earthquakes

## Overview

This project was undertaken to develop earthquake maps that are informative and easy to use. Earthquake data was collected from U.S Geographical Survey website and plotted using HTML, D3 and Leaflet libraries. Mapbox maps were used as base maps. The map created for this project has the below features:

- Base Maps: 3 types of mapbox maps are available for selection via layer control. Only one map can be selected at a time
    - Streets
    - Satellite
    - Night Navigation

- Overlay maps contain the below data:

Categories:

    - Past 7 days of earthquake data from USGS color-coded by magnitudes, classified in increaments of 1 until 5
    - Major earthquakes greater than 4.5 in the past 7 days, from USGS. This is again color-coded by magnitude, classified until 6. 
    
User can select either one of the overlays, since they overlap

Tectonic Plates:

    - Tectonic plate reference lines, collected from github user fraxen, tectonicplates repository. Controlled by a checkbox.

The overlays were grouped with the help of a groupedlayer plugin by 'ismyrnow' in leaflet-groupedlayercontrol. This involved downloading the files and referencing it locally since there was no CDN.     

- Legends containing information on the color-codes for earthquake and major earthquake layers. The legends will also be displayed/removed based on the layers selected
