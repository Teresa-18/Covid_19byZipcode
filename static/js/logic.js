// Creating map object
var myMap = L.map("map", {
    center: [29.4241, -98.4936],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "static/data/Bexar_County.geojson";

  
  // Function that will determine the color of a neighborhood based on the borough it belongs to
  function chooseColor(zipcode) {

  switch (zipcode) {
    case "78233":
      return "yellow";
    case "78216":
      return "red";
    case "78251":
      return "orange";
    case "78228":
      return "green";
    case "78237":
      return "purple";
    case "78210":
      return "aqua";
    case "78209":
      return "slateblue";
    case "78223":
      return "lawngreen";
    case "78256":
      return "mediumblue";
    case "78219":
      return "deepskyblue";
    case "78244":
      return "magenta";
    case "78201":
      return "darkorange";
    default:
      return "black";
    }
  }
  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: chooseColor(feature.properties.ZIP_CODE),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h1> Positive " + feature.properties.Positive + "</h1><hr> <h2>Active Cases " + feature.properties.ActiveCases + "</h2>");
  
      }
    }).addTo(myMap);
  });
  