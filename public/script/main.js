$(document).ready(function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieGlncnV4IiwiYSI6ImNqeTB3c2pxbTAxajMzYm52bW9kc25wcTIifQ.U6sAoHkOoLqc9Wi5WwgY2g";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/light-v10", // stylesheet location
    center: [-73.567256, 45.501689], // starting position
    zoom: 12 // starting zoom
  });

  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // Set the bounding box coordinates
  });

  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
  );

  //   searchResult = {
  //     type: "Feature",
  //     properties: {
  //       "@id": "node/207717952",
  //       amenity: "kindergarten",
  //       name: "CPE Pause-Parent-Enfant"
  //     },
  //     geometry: {
  //       type: "Point",
  //       coordinates: [-73.63809, 45.46879]
  //     },
  //     id: "node/207717952"
  //   };

  $.getJSON("../data/json/kindergarten.json", function(json) {
    var markers = json.features;
    markers.forEach(function(marker) {
      // console.log(marker);
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker kindergarten";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);

      //   //   Distance calculator
      //   var options = { units: "kilometers" };
      //   Object.defineProperty(marker.properties, "distance", {
      //     value: turf.distance(searchResult, marker.geometry, options),
      //     writable: true,
      //     enumerable: true,
      //     configurable: true
      //   });
      //   var roundedDistance = Math.round(marker.properties.distance * 10) / 10;

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                marker.properties.name +
                "</h3><p>" +
                marker.properties.amenity +
                "</p><p>"
              // +
              // roundedDistance +
              // "</p>"
            )
        )
        .addTo(map);

      //   console.log(
      //     marker.properties.distance + " " + marker.geometry.coordinates
      //   );
    });
  });

  // CREATE METRO
  $.getJSON("../data/json/metro.json", function(json) {
    var markers = json.features;
    markers.forEach(function(marker) {
      // console.log(marker);
      // create a HTML element for each feature
      var el = document.createElement("div");
      el.className = "marker metro";

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat([marker.xLong, marker.yLat]).addTo(map);

      //   //   Distance calculator
      //   var options = { units: "kilometers" };
      //   Object.defineProperty(marker, "distance", {
      //     value: turf.distance(
      //       searchResult,
      //       [marker.xLong, marker.yLat],
      //       options
      //     ),
      //     writable: true,
      //     enumerable: true,
      //     configurable: true
      //   });
      //   var roundedDistance = Math.round(marker.distance * 10) / 10;

      new mapboxgl.Marker(el)
        .setLngLat([marker.xLong, marker.yLat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" + marker.MetroStation + "</h3><p>"
              //  +
              // roundedDistance +
              // "</p>"
            )
        )
        .addTo(map);

      //   console.log(
      //     marker.properties.distance + " " + marker.geometry.coordinates
      //   );
    });
  });

  //   var searchResult;
  //   geocoder.on("result", function(ev) {
  //     searchResult = ev.result.geometry;
  //     map.getSource("single-point").setData(searchResult);
  //   });

  // new mapboxgl.Marker().setLngLat(searchResult.geometry.coordinates).addTo(map);
});
