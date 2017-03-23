import {STORE} from './store.js';
import {SingleRide, AllRides, SingleHazard, AllHazards} from './models/models.js';
import {UserModel} from './models/model-user.js';
import DirectionsService from '@google/maps';
import DirectionsRenderer from '@google/maps';
import GoogleMap from 'google-map-react';
import React from 'react';


export const ACTIONS = {

  changeNav: function(selectedRoute, urlHash){
    STORE.setStore('currentRoute', selectedRoute);
    if(urlHash === 'home'){urlHash = ''};
    window.location.hash = urlHash;
  },

  saveRide: function(newRideEntry){
    let ride = new SingleRide();
      ride.set(newRideEntry);
      ride.save().then(function(serverRes){
        console.log(serverRes)
        ACTIONS.getAllSavedRides();
      });
  },

  getSingleSavedRide: function(rideId){
    let rides = new AllRides();
    let correctRide = rides.map(function(listEl){
      if(rideId === listEl.id){return listEl;}
    })
    return correctRide;
  },

  getAllSavedRides: function(){
    let rides = new AllRides();
      rides.fetch().then(function(serverRes){
        STORE.setStore('savedRides', serverRes)
      });
  },

  saveHazard: function(mapHazards){
    console.log('saving hazard')
      let bad = new SingleHazard();
      bad.set(mapHazards);
      bad.save().then(function(serverRes){
        console.log('saved hazard:', serverRes)
<<<<<<< HEAD
        // ACTIONS.getAllHazards()
=======
          ACTIONS.getAllHazards()
>>>>>>> 5774cc40428ba76ddee645784331c1edae72289f
    }).fail(function(err){
      console.log('err : ', err.responseText)
    })

  },

  getSingleHazard: function(hazardId){
    let hazard = new AllHazards();
    let correctHazard = hazard.map(function(listEl){
      if(hazardId === listEl.id){return listEl}
    })
    return correctHazard;
  },
  // ACTIONS.getAllHazards(this.state.viewCorners)

  getAllHazards: function(currentViewCorners){
    console.log(currentViewCorners)

    let hazards = new AllHazards(currentViewCorners); //
    console.log(hazards.url)

    hazards.fetch().then(function(serverRes){
      console.log(serverRes)
      STORE.setStore('hazardsToSave', {})
      STORE.setStore('mapHazards', serverRes);
    })
  },

  setHazardToSave: function(hazard){
    STORE.setStore('hazardsToSave', hazard)
  },

  userLogin: function(username, password){
    UserModel.logIn(username, password).then(function(serverRes){
      // localStorage.setItem("user", JSON.stringify(serverRes))
      // STORE.setStore('currentUser', serverRes);
      ACTIONS.getUser();
      ACTIONS.changeNav('home', '')
    })
  },

  userRegister: function(newUserObj){
    UserModel.register(newUserObj).then(function(serverRes){
      ACTIONS.changeNav('login', 'login');
    })
  },

  userLogout: function(){
    UserModel.logOut().then(function(serverRes){
      STORE.setStore('currentUser', '');
      ACTIONS.changeNav('login', 'login');
    })
  },

  getUser: function(){
    UserModel.getCurrentUser().then(function(serverRes){
      STORE.setStore('currentUser', serverRes);
    })
  },

  autoType: function(mapObj, elementOne, elementTwo){
    let options = {types: []}
    let autoOne = new mapObj.maps.places.Autocomplete(elementOne, options);
    let autoTwo = new mapObj.maps.places.Autocomplete(elementTwo, options);
  },

  getDirections: function(mapObj, directionsRequestObj){
     let directions = new mapObj.maps.DirectionsService();
       directions.route(directionsRequestObj, function(result, status){
      if(status === 'OK'){
        // console.log(result.routes[0].overview_polyline.length)
        let wind = new mapObj.maps.InfoWindow();
        let directionsDisplay = new mapObj.maps.DirectionsRenderer();
        wind.setContent("<i class='fa fa-bicycle' aria-hidden='true'></i>" + " " + result.routes[0].legs[0].distance.text + "<br>" + result.routes[0].legs[0].duration.text + " ");
        wind.setPosition(result.routes[0].legs[0].steps[0].end_location);
        wind.open(mapObj.map);
            directionsDisplay.setDirections(result);
            directionsDisplay.setMap(mapObj.map);
      }
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   var pos = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude
      //   };
      // }),
      //wind.setPosition(pos);
      // let renderArray = [];
      // let requestArray = [];
      // STORE.setStore('directionsResult', result);
      // let mapIt = result.routes.map(function(listEl){
      //   console.log(listEl);
      //   let directionsDisplay = new mapObj.maps.DirectionsRenderer();
      //   renderArray.push(directionsDisplay);
      // });
      // directionsDisplay.setDirections(listEl);
      // directionsDisplay.setMap(mapObj.map);
     });
  },

  goToRide: function(org, dest){
    STORE.setStore('inputRide', {origin: org, destination: dest});
    ACTIONS.changeNav('map', 'map');
  }

};
