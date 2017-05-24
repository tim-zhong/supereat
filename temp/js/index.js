var locationBtn = document.getElementById("location")
    locationPreviewContainer = document.getElementById("location-preview-container");
    locationPreviewMap = document.getElementById('location-preview');
    locationPreviewInnerContainer = document.getElementById("location-preview-inner-container");
    locationPreviewConfirm = document.getElementById("location-preview-confirm");

var searchAddress = document.getElementById("search-address");
var searchLat = document.getElementById("search-lat");
var searchLng = document.getElementById("search-lng");

var autocomplete;
var autoAddress,
    autoLat,
    autoLng;


function tryAPIGeolocation() { //Warning: coordinates are not accurate
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCZ9becLveavTVuvcR1jrhTOxagQz9KlQo", function(success) {
        initLocationPreview({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    })
    .fail(function(err) {
        alert("API Geolocation error! \n\n"+err);
    });
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

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            initLocationPreview,
            browserGeolocationFail,
            {maximumAge: 50000, timeout: 20000, enableHighAccuracy: true}
        );
    }
};

function showLocationPreviewModal(){
    getUserLocation();
    document.getElementById("location-preview-container").className = 'modal-container-show';
}

function closeLocationPreviewModal(event){
    if(event.target != locationPreviewContainer &&
        event.target != locationPreviewInnerContainer &&
        event.target != locationPreviewConfirm) return;

    event.stopPropagation();
    document.getElementById("location-preview-container").className = 'modal-container';
    searchAddress.value = "";
    searchLat.value = "";
    searchLng.value = "";
}

function initLocationPreview(position) {
    options = {
        zoom: 15,
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
    };

    if(typeof styles != 'undefined') options.styles = styles;
    
    var map = new google.maps.Map(document.getElementById('location-preview'), options);

    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow, position);
}

// Geocode reverse lookup
function geocodeLatLng(geocoder, map, infowindow, position) {
    var latlng = {lat: parseFloat(position.coords.latitude), lng: position.coords.longitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[1]) {
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[1].formatted_address);
                autoAddress = results[1].formatted_address;
                autoLat = latlng.lat;
                autoLng = latlng.lng;
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
 }

 function initAutocomplete() {
    var addressField = document.getElementById("search-keyword");
    var autoCompleteOptions = {
        types: ['geocode'],
        componentRestrictions: {country: "ca"}
    };
    autocomplete = new google.maps.places.Autocomplete(addressField, autoCompleteOptions);

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', function() {setValues();});
}

function setValues() {
    place = autocomplete.getPlace();
    searchLat.value = place.geometry.location.lat();
    searchLng.value = place.geometry.location.lng();
    searchAddress.value = document.getElementById("search-keyword").value;
}

locationBtn.addEventListener("click", showLocationPreviewModal);
locationPreviewContainer.addEventListener("click",closeLocationPreviewModal);
locationPreviewConfirm.addEventListener("click",function(event){
    searchAddress.value = autoAddress;
    searchLat.value = autoLat;
    searchLng.value = autoLng;

    document.getElementById("search-keyword").value = autoAddress;
    closeLocationPreviewModal(event);
});

initAutocomplete();