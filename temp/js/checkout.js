var bgMap = document.getElementById('bg-map');

function initMap(position) {
    var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
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

window.onscroll = function(){
    if(window.innerWidth > 900) return;
    
    var curTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(curTop > 300){
        if(bgMap.hidden) return;
        bgMap.hidden = true;
        document.getElementById('bg-map').style.visibility = 'hidden';
    } else {
        if(!bgMap.hidden) return;
        bgMap.hidden = false;
        document.getElementById('bg-map').style.visibility = 'visible';
    }
};

/*-------------- Get user's current location ------------*/
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            initMap,
            browserGeolocationFail,
            {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true}
        );
    }
};

function browserGeolocationFail(error) {
    switch (error.code) {
        case error.TIMEOUT:
            alert("Browser geolocation error !\n\nTimeout.");
            break;
        case error.PERMISSION_DENIED:
            if(error.message.indexOf("Only secure origins are allowed") == 0) {
                tryAPIGeolocation();
            }
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Browser geolocation error !\n\nPosition unavailable.");
            break;
    }
};


function tryAPIGeolocation() { //Warning: coordinates are not accurate
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCZ9becLveavTVuvcR1jrhTOxagQz9KlQo", function(success) {
        initMap({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    })
    .fail(function(err) {
        alert("API Geolocation error! \n\n"+err);
    });
};

getUserLocation();