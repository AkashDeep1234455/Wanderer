
mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [coordinates[0],coordinates[1]], // starting position [lng, lat]
    zoom: 9 // starting zoom
});


const marker = new mapboxgl.Marker({color:'red'})
.setLngLat([coordinates[0],coordinates[1]])//Listing.geometry.coordinates
.addTo(map);