mapboxgl.accessToken =
  "pk.eyJ1IjoieGlncnV4IiwiYSI6ImNqeTB3c2pxbTAxajMzYm52bW9kc25wcTIifQ.U6sAoHkOoLqc9Wi5WwgY2g";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/light-v10", // stylesheet location
  center: [-73.567256, 45.501689], // starting position
  zoom: 12 // starting zoom
});

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

$.getJSON("../data/json/kindergarten.json", function(json) {
  var items = json.features;
  items.forEach(function(item) {
    console.log(item.properties.name);
  });
});
