$(document).ready(function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieGlncnV4IiwiYSI6ImNqeTB3c2pxbTAxajMzYm52bW9kc25wcTIifQ.U6sAoHkOoLqc9Wi5WwgY2g";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/light-v10", // stylesheet location
    center: [-73.567256, 45.501689], // starting position
    zoom: 12 // starting zoom
  });

  map.addControl(
    (geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }))
  );

  var searchResult;

  geocoder.on("result", function(ev) {
    searchResult = ev.result.geometry;
    console.log(ev.result.geometry);
    $(".marker").remove();
    renderMarker();
  });

  function renderMarker() {
    console.log("rendering markers");
    $.getJSON("../data/json/kindergarten.json", function(json) {
      //   ADD KINDERGATEN
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker kindergarten";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker.properties, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              marker.geometry,
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance =
            Math.round(marker.properties.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.name +
                  "</h3><p>" +
                  marker.properties.amenity +
                  "</p><p>" +
                  roundedDistance +
                  "</p>"
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
      //   ADD MARKER
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker metro";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat([marker.xLong, marker.yLat])
          .addTo(map);

        if (searchResult) {
          console.log("redering the distance");
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              [marker.xLong, marker.yLat],
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance = Math.round(marker.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat([marker.xLong, marker.yLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.MetroStation +
                  "</h3><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        // console.log(marker.distance + " " + [marker.xLong, marker.yLat]);
      });
    });

    // CREATE CLINIC
    $.getJSON("../data/json/clinic.json", function(json) {
      //   ADD MARKER
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker clinic";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker.properties, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              marker.geometry,
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance =
            Math.round(marker.properties.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.name +
                  "</h3><p>" +
                  marker.properties.amenity +
                  "</p><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        //   console.log(
        //     marker.properties.distance + " " + marker.geometry.coordinates
        //   );
      });
    });

    // CREATE SCHOOL
    $.getJSON("../data/json/schools.json", function(json) {
      //   ADD MARKER
      var markers = json;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker school";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat([marker.xLong, marker.yLat])
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              [marker.xLong, marker.yLat],
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance = Math.round(marker.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat([marker.xLong, marker.yLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.NOM_COURT_ORGNS +
                  "</h3><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        //   console.log(
        //     marker.properties.distance + " " + marker.geometry.coordinates
        //   );
      });
    });

    // CREATE PARK
    $.getJSON("../data/json/park.json", function(json) {
      //   ADD MARKER
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker park";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker.properties, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              marker.geometry,
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance =
            Math.round(marker.properties.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.leisure +
                  "</h3><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        //   console.log(
        //     marker.properties.distance + " " + marker.geometry.coordinates
        //   );
      });
    });

    // CREATE GROGERIES
    $.getJSON("../data/json/groceries.json", function(json) {
      //   ADD MARKER
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker grocery";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker.properties, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              marker.geometry,
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance =
            Math.round(marker.properties.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.name +
                  "</h3><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        //   console.log(
        //     marker.properties.distance + " " + marker.geometry.coordinates
        //   );
      });
    });

    // CREATE GYM
    $.getJSON("../data/json/gym.json", function(json) {
      //   ADD MARKER
      var markers = json.features;
      markers.forEach(function(marker) {
        // console.log(marker);
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker gym";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);

        if (searchResult) {
          //   Distance calculator
          var options = { units: "kilometers" };
          Object.defineProperty(marker.properties, "distance", {
            value: turf.distance(
              searchResult.coordinates,
              marker.geometry,
              options
            ),
            writable: true,
            enumerable: true,
            configurable: true
          });
          var roundedDistance =
            Math.round(marker.properties.distance * 10) / 10;
        }

        //   ADD POPUP
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.name +
                  "</h3><p>" +
                  roundedDistance +
                  "</p>"
              )
          )
          .addTo(map);

        //   console.log(
        //     marker.properties.distance + " " + marker.geometry.coordinates
        //   );
      });
    });
  }
});
