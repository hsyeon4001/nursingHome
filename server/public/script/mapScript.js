
let mapOptions = {
    center: new naver.maps.LatLng(37.535879, 126.865239),
    zoom: 17
};

let map = new naver.maps.Map('map', mapOptions);

let markerOptions = {
    position: new naver.maps.LatLng(37.535879, 126.865239),
    map: map
};

let marker = new naver.maps.Marker(markerOptions);