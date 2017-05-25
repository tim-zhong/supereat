var bgMap = document.getElementById('bg-map');

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