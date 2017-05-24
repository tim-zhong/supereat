
function initMap(lat, lng) {
    var latlng = {lat: lat, lng: lng};
    var options = {
        center : latlng,
        zoom: 15
    };

    if(styles) options.styles = styles;
    
    var map = new google.maps.Map(document.getElementById('bg-map'), options);
    
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
}

initMap(43.4733031, -80.5332649);