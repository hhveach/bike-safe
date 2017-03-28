import {STORE} from './store.js';
import {SingleRide, AllRides, SingleHazard, AllHazards} from './models/models.js';
import {UserModel} from './models/model-user.js';
// import DirectionsService from '@google/maps';
// import DirectionsRenderer from '@google/maps';
// import GoogleMap from 'google-map-react';
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
      console.log(STORE.getStore().mapHazards)
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
    console.log('saving hazard')
      let bad = new SingleHazard();
      bad.set(mapHazards);
      bad.save().then(function(serverRes){
        console.log('saved hazard:', serverRes)
          // ACTIONS.getAllHazards(this.props.viewCorners)
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
    // console.log(currentViewCorners)
    let hazards = new AllHazards(currentViewCorners); //
    // console.log(hazards.url)
    hazards.fetch().then(function(serverRes){
      // console.log(serverRes)
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
    navigator.geolocation.getCurrentPosition(function(position){
    let pos = {lat: position.coords.latitude, lng: position.coords.longitude};
    let windo = new mapObj.maps.InfoWindow({map: mapObj.map});
    windo.setContent("<i class='fa fa-location-arrow' aria-hidden='true'></i>");

    windo.setPosition(pos);
    windo.open(mapObj.map);

  });
    let options = {types: []}
    let autoOne = new mapObj.maps.places.Autocomplete(elementOne, options);
    let autoTwo = new mapObj.maps.places.Autocomplete(elementTwo, options);
  },

  // getPlaces: function(map, maps){
  //   let service = new google.maps.places.PlacesService(map);
  //
  //   service.PlacesDetailsRequest();
  //
  //
  // let request = {bounds: mapObj.map.getBounds(), keyword: 'best view'};
  // service.radarSearch(place, function(results, status){
  //   console.log(results)
  // });
  //
  //   // service.radarSearch(request, callback);
  // },

  getTime: function(){
    let time = moment().format("HH");
    let day = moment().format("e");
    STORE.setStore('rideTime', {time: time, day: day});
  },

  getDirections: function(mapObj, directionsRequestObj){
       let directions = new mapObj.maps.DirectionsService();
       let directionsDisplay = new mapObj.maps.DirectionsRenderer();
       directions.route(directionsRequestObj, function(result, status){
      if(status === 'OK'){
        let wind = new mapObj.maps.InfoWindow();
        wind.setContent("<i class='fa fa-bicycle' aria-hidden='true'></i>" + " " + result.routes[0].legs[0].distance.text + "<br>" + result.routes[0].legs[0].duration.text + " ");
        wind.setPosition(result.routes[0].legs[0].steps[0].end_location);
        wind.open(mapObj.map);
            directionsDisplay.setDirections(result);
            directionsDisplay.setMap(mapObj.map);
      };
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
  });
},

  goToRide: function(org, dest){
    STORE.setStore('inputRide', {origin: org, destination: dest});
    ACTIONS.changeNav('map', 'map');
  },

  goToReminders: function(){
    STORE.setStore('viewReminders', true)
  },

  goOnRide: function(){
    STORE.setStore('viewReminders', false);
  }

};
