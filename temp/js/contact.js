function initContactMap(lat, lng) {
    var latlng = {lat: lat, lng: lng};
    var options = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        center : latlng,
        zoom: 15
    };

    if(styles) options.styles = styles;
    
    var map = new google.maps.Map(document.getElementById('contact-map'), options);
    
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
}


initContactMap(43.4733031, -80.5332649);