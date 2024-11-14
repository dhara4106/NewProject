
mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: "map", // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 13, // starting zoom
});
const marker = new FontawesomeMarker({   
            icon: 'fa-solid fa-house',
            iconColor: 'steelblue',
            color: 'yellow',    
    })
    .setLngLat(listing.geometry.coordinates)  //Listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({offset: 30})
       .setHTML(`<h6>${listing.title}</h6><p>Exact location will be provided during booking!</p>`)
    )
    .addTo(map);
