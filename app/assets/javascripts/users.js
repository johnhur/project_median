// wrap other $() operations on your page that depend on the DOM being ready
// $(".users.new").ready(function(){
//   alert("HELLO")
// })
// $(".users.new").ready(function(){
//   alert("HELLO")
// })
// another way to specify a page specific event, but this needs turbo-links to work, which is not the case for us.

$(function() {

  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  var infowindow = new google.maps.InfoWindow
    // geolocation variables
  var userLat;
  var userLong;
  var userLatLong;
  var transitLayer;
  var bikeLayer;
  var trafficLayer;
  var weather;
  var mapLat = 37.768120;
  var mapLong = -122.441875;
  // yelp global variables
  var userTerm;
  var midLat;
  var midLng;


  // because we can't use the .ready(function), here we are checking for a class
  // that was added to the maps users index page (which is where we want this code to run)
  // If the class we've called "index" is not on a page, then this code won't run (so map doesn't
  // try to load on every page, and geolocation doesn't try to ask user to allow it on every page.)
   if ($(".get-location").length !== 0) {

    if (Modernizr.geolocation) {

      navigator.geolocation.getCurrentPosition(function(loc){
        userLat = loc.coords.latitude;
        userLong = loc.coords.longitude;

        //onclick conditional to check if lat and long are populated.. for users

        $("#user_lat").val(userLat)
        $("#user_lng").val(userLong)

      }, resErr);
    }
   }


  if ($(".index").length !== 0) {

    renderHandlebars();

    // ----------------------------- INITIALIZE MAP -----------------------------

    function initialize() {
      // get the div element to put the map in
      var mapDiv = document.getElementById('map-canvas');

      directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        suppressInfoWindows: true
      });

      // MapOptions: visibility and presentation of controls
      var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(mapLat, mapLong),
        mapTypeId: google.maps.MapTypeId.TERRAIN
      };

      // Map constructor: create new map. Pass in optional parameters.
      map = new google.maps.Map(mapDiv, mapOptions);
      directionsDisplay.setMap(map);

      transitLayer = new google.maps.TransitLayer();
      bikeLayer = new google.maps.BicyclingLayer();
      trafficLayer = new google.maps.TrafficLayer();

    } // close initialize function

    // ----------------------------- GEOLOCATION -----------------------------

    function checkForLoc() {
      if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(getLoc, resErr);
      } else {
        alert('Your browser does not support geolocation');
        weather = 'https://api.wunderground.com/api/0fd9bd78fc2f4356/geolookup/conditions/q/' + mapLat + ',' + mapLong + '.json';
      }
    }

  function getLoc(location) {

    console.log("HELLLOO")
    // variables declared globally, see top of script
    userLat = location.coords.latitude;
    userLong = location.coords.longitude;
    userLatLong = new google.maps.LatLng(userLat, userLong);
    marker = new google.maps.Marker({
      position: userLatLong,
      map: map,
      title: "You Are Here!",
      icon: 'person.png'
    });

    // weather = 'https://api.wunderground.com/api/0fd9bd78fc2f4356/geolookup/conditions/q/' + userLat + ',' + userLong + '.json';
    // getWeather(weather);

    //we need to have a callback for the getMidpoint function here because we want to
    // ensure that the userLatLong is passed into the getMidpoint function.
    //  otherwise the variables will be undefined.
    // This may be changed based on user addresses.
    // getMidpoint();
  }

  function resErr(error) {
      if (error.code == 1) {
        alert('Your privacy is respected! Your location has not been detected.');
      } else if (error.code == 2) {
        alert('Location Unavailable');
      } else if (error.code == 3) {
        alert('TimeOut');
      }
      weather = 'https://api.wunderground.com/api/0fd9bd78fc2f4356/geolookup/conditions/q/' + mapLat + ',' + mapLong + '.json';
      getWeather(weather);
    }

    // **** weather underground api key needed *****
    // ----------------------------- WEATHER LAYER OBJECT -----------------------------
    // function getWeather(weather) {
    //   $.ajax({
    //     url: weather,
    //     jsonp: "callback",
    //     dataType: "jsonp"
    //   }).done(function(data) {
    //     //setting the spans to the correct parameters
    //     $('#location').html(data['location']['city']);
    //     $('#temp').html(data['current_observation']['temp_f']);
    //     $('#desc').html(data['current_observation']['weather']);
    //     $('#wind').html(data['current_observation']['wind_string']);
    //     //filling the image src attribute with the image url
    //     $('#img').attr('src', data['current_observation']['icon_url']);
    //   });
    // }

    // ******* REFACTORED WITH ANGULAR **********
    // ---------------------------- FIND LOGGED IN USERS --------------------------
    // $("#friends").click(function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //       // url looks for 'friends' action (see routes.rb)
    //       url: '/friends',
    //       method: 'get',
    //       dataType: 'json'
    //     }).done(function(data) {
    //       data.forEach(function(friend) {
    //         var friendName = friend.first_name;
    //         var friendLat = friend.lat;
    //         var friendLng = friend.lng;
    //         var thisLatLong = new google.maps.LatLng(friendLat, friendLng);
    //         var marker = new google.maps.Marker({
    //           animation: google.maps.Animation.DROP,
    //           position: thisLatLong,
    //           map: map,
    //           title: friendName,
    //           icon: 'person.png'
    //         });
    //       });
    //       var html = HandlebarsTemplates['users/friends'](data);
    //         // Use an ID to ensure only one, we don't want an array

    //         $('#show').children().remove() // removes previous list of logged in users. 
    //         $('#show').append(html);

    //     });
    //   });

    // ----------------------------- SEARCH YELP -----------------------------
    // click search & call searchYelp function with geolocation global variables
    // must select the search button only
    $("input[value='Search']").click(function(e) {
      e.preventDefault();
      // getting the category the user filled in on the form
      // on the user index page
      console.log(midLat + ", " + midLng);
      userTerm = $(".user_term").val();
      // searchYelp(userLat, userLong, userTerm);
      searchYelp(midLat, midLng, userTerm);

      $("#step2").removeClass("active step")
      $("#step2").addClass("step")

      $("#step3").removeClass("disabled step")
      $("#step3").addClass("active step")

    });

    function searchYelp(lat, lng, term) {
      $.ajax({
        // url looks for 'results' action (see routes.rb)
        // lat, lng, and term in the URL string can be any words, as long as the
        // same words are used in the params in the places controller method
        url: '/results?lat=' + lat + '&lng=' + lng + '&term=' + term,
        method: 'get',
        dataType: 'json'
      }).done(function(data) {
        data['businesses'].forEach(function(business) {
          var placeName = business.name;
          var placeRating = business.rating_img_url_small;
          var placeImg = business.image_url;
          var placeUrl = business.url;
          var placeLat = business.location.coordinate.latitude;
          var placeLong = business.location.coordinate.longitude;
          var thisLatLong = new google.maps.LatLng(placeLat, placeLong);

          var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: thisLatLong,
            map: map,
            title: placeName,
            icon: 'place.png'
          });

          // Thanks to Dom for inspiration on styling these infowindows
          // and closing previous open infowindow when another marker is clicked
          google.maps.event.addListener(marker, 'click', function() {
            var content = '<h5>' + placeName + '</h5>' + '<a href=' + placeUrl + ' target="_blank"><img src=' + placeImg + '></a><div><img src=' + placeRating + '></div>';
            infowindow.close();
            infowindow.setContent(content);
            infowindow.open(marker.get('map'), marker);
            calcRoute(userLatLong, thisLatLong);
          });
        });
      });
    }


// ------------------------- GEOMETRIC MIDPOINT -------------------------------
// Since class is added dynamically, need to use event delegation to register event handler
  $(document).on('click', ".meet", function(e) {
    e.preventDefault();

    $("#step1").removeClass("active step")
    $("#step1").addClass("step")

    $("#step2").removeClass("disabled step")
    $("#step2").addClass("active step")

       // var chosenLat = $('input:hidden[name=lat]').val();
    // var chosenLng = $('input:hidden[name=lng]').val();

    // PROBLEM: even when we click on a different user's meet button, jquery always chooses the first user's hidden input values..

    // SOLUTION: store each user's unique latitude and longitude as attributes in their respective meet button, and grab these values using jQuery as written below:

    var chosenLat = $(this).attr('data-lat');
    var chosenLng = $(this).attr('data-lng');
    var friendName = $(this).attr('data-fn');
    var thisLatLong = new google.maps.LatLng(chosenLat, chosenLng);

           var marker = new google.maps.Marker({
             animation: google.maps.Animation.DROP,
             position: thisLatLong,
             map: map,
             title: friendName,
             icon: 'person.png'
           });  


    getMidpoint(chosenLat, chosenLng);
  });

  function getMidpoint(lat, lng) {
    // **** condition in which users' locations are the same *****
    //example for midpoint 

    friend = new google.maps.LatLng(lat, lng);
    // console.log(marker.position)
    console.log("this is userLatLong" + userLatLong)
    console.log("this is friend: " + friend)
    mid = google.maps.geometry.spherical.interpolate(userLatLong, friend, 0.5) // ******* issue is here ********
    console.log(mid);
    midLat = mid.G
    midLng = mid.K
      // lat is stored as A, lng is stored as F
 

    // marker2 = new google.maps.Marker({
    //   position: friend,
    //   map: map,
    //   title: "Friend",
    //   icon: 'person.png'
    // });

    mid_marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: mid,
      map: map,
      title: "MidPoint",
      icon: 'person.png'
    });

    center = mid_marker.getPosition();
    map.setCenter(center);
  }

    // -------------------CALCULATE ROUTE FROM USER TO PLACE-----------------

    function calcRoute(orig, dest) {
      var selectedMode = document.getElementById('mode').value;
      var request = {
        origin: orig,
        destination: dest,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }

    // ----------------------------- HANDLEBARS -----------------------------

    // At its most basic, Handlebars is just a place to put your client-side HTML
    // Handlebars makes sure it's clean and safe
    // need the path to the hbs file here
    function renderHandlebars() {
      var html = HandlebarsTemplates['users/index'](); // place data in parens when you're sending data to hbs file
      // Use an ID to ensure only one, we don't want an array
      $('#map').append(html);
    }

    initialize();
    checkForLoc();

    // ----------------------------- TRANSIT LAYER OBJECT -----------------------------
    function showTransit() {
      bikeLayer.setMap(null);
      trafficLayer.setMap(null);
      if (typeof transitLayer.getMap() == 'undefined' || transitLayer.getMap() === null) {
        transitLayer.setMap(map);
      } else {
        transitLayer.setMap(null);
      }
    }

    function showBike() {
      transitLayer.setMap(null);
      trafficLayer.setMap(null);
      if (typeof bikeLayer.getMap() == 'undefined' || bikeLayer.getMap() === null) {
        bikeLayer.setMap(map);
      } else {
        bikeLayer.setMap(null);
      }
    }

    function showTraffic() {
      bikeLayer.setMap(null);
      transitLayer.setMap(null);
      if (typeof trafficLayer.getMap() == 'undefined' || trafficLayer.getMap() === null) {
        trafficLayer.setMap(map);
      } else {
        trafficLayer.setMap(null);
      }
    }

    // ----------------------------- JQUERY EVENT HANDLERS -----------------------------
    $("#transit").click(function(event) {
      event.stopPropagation();
      showTransit();
    });

    $("#bike").click(function(event) {
      event.stopPropagation();
      showBike();
    });

    $("#traffic").click(function(event) {
      event.stopPropagation();
      showTraffic();
    });

  }
}); // closing tag for everything in this file