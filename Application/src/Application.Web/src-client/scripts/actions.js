import {STORE} from './store.js';
import {SingleRide, AllRides, SingleHazard, AllHazards} from './models/models.js';
import {UserModel} from './models/model-user.js';
import React from 'react';
import moment from 'moment';


export const ACTIONS = {

  changeNav: function(selectedRoute, urlHash){
    STORE.setStore('currentRoute', selectedRoute);
    if(urlHash === 'home'){urlHash = ''};
    window.location.hash = urlHash;
  },

  deleteRide: function(rideId){
    let delRide = new SingleRide();
    delRide.set({id: rideId});
    delRide.destroy().then(function(){
      ACTIONS.getAllSavedRides();
    });
  },

  deleteHaz: function(hazardId){
    let delHaz = new SingleHazard();
    delHaz.set({id: hazardId})
    delHaz.destroy().then( function(deletedRecord){
      let newMapHazards = STORE.getStore().mapHazards
      let filteredMapHazards = newMapHazards.filter( function(hazard){
        return hazard.id !== deletedRecord.id
      })
      STORE.setStore('mapHazards', filteredMapHazards)
    })
  },

  saveRide: function(newRideEntry){
    let ride = new SingleRide();
      ride.set(newRideEntry);
      ride.save().then(function(serverRes){
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
      let bad = new SingleHazard();
      bad.set(mapHazards);
      bad.save().then(function(serverRes){
    }).fail(function(err){
    })

  },

  getSingleHazard: function(hazardId){
    let hazard = new AllHazards();
    let correctHazard = hazard.map(function(listEl){
      if(hazardId === listEl.id){return listEl}
    })
    return correctHazard;
  },

  getAllHazards: function(currentViewCorners){
    let hazards = new AllHazards(currentViewCorners);
    hazards.fetch().then(function(serverRes){
      STORE.setStore('hazardsToSave', {})
      STORE.setStore('mapHazards', serverRes);
    })
  },

  setHazardToSave: function(hazard){
    STORE.setStore('hazardsToSave', hazard)
  },

  userLogin: function(username, password){
    UserModel.logIn(username, password).then(function(serverRes){
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

  getLocation: function(mapObj){
    let geo = new mapObj.maps.Geocoder();
    navigator.geolocation.getCurrentPosition(function(position){
    let pos = {lat: position.coords.latitude, lng: position.coords.longitude};
    geo.geocode({'location': pos}, function(results, status){
      STORE.setStore('currentLocation', results[0].formatted_address);
    });
    let location = 'http://images.clipartpanda.com/google-location-icon-519580-076_LocationArrow-512.png';
    let windo = new mapObj.maps.Marker({
      position: pos,
      animation: mapObj.maps.Animation.DROP,
      icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 3, strokeColor: 'blue'},
      map: mapObj.map
      });
    });
  },

  getTime: function(){
    let time = moment().format("HH");
    let day = moment().format("e");
    let actual = moment();
    STORE.setStore('rideTime', {time: time, day: day, date: actual});
  },

  getDirections: function(mapObj, directionsRequestObj){
       let directions = new mapObj.maps.DirectionsService();
       let directionsDisplay = new mapObj.maps.DirectionsRenderer();
       directions.route(directionsRequestObj, function(result, status){
      if(status === 'OK'){
        let wind = new mapObj.maps.InfoWindow();
        wind.setContent("<div class='window'><i class='fa fa-bicycle' aria-hidden='true'></i>"
        + " " + result.routes[0].legs[0].distance.text + "<br>" + "<i class='fa fa-clock-o' aria-hidden='true'></i>"
        + " " + result.routes[0].legs[0].duration.text + "</div> ");
        wind.setPosition(result.routes[0].legs[0].end_location);
        wind.open(mapObj.map);
            directionsDisplay.setDirections(result);
            directionsDisplay.setMap(mapObj.map);
      };
    });
  },

  goToRide: function(org, dest){
    STORE.setStore('inputRide', {origin: org, destination: dest});
    ACTIONS.changeNav('home', '');
  },

  goToReminders: function(){
    STORE.setStore('viewReminders', true)
  },

  goOnRide: function(){
    STORE.setStore('viewReminders', false);
  },

  goToSaved: function(){
    STORE.setStore('viewSaved', true);
  },

  goBackToHomeView: function(){
    STORE.setStore('viewSaved', false);
  }
};
