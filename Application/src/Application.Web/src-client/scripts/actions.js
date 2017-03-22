import {STORE} from './store.js';
import {SingleRide, AllRides, SingleHazard, AllHazards} from './models/models.js';
import {UserModel} from './models/model-user.js';
import DirectionsService from '@google/maps';
import DirectionsRenderer from '@google/maps';


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

  saveHazard: function(newHazard){
    console.log('saving hazard')
      let bad = new SingleHazard();
        bad.set(newHazard);
        bad.save().then(function(serverRes){
          ACTIONS.getAllHazards()

    })

  },

  getSingleHazard: function(hazardId){
    let hazard = new AllHazards();
    let correctHazard = hazard.map(function(listEl){
      if(hazardId === listEl.id){return listEl}
    })
    return correctHazard;
  },

  getAllHazards: function(){
    let hazards = new AllHazards();
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
      STORE.setStore('currentUser', serverRes);
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

  getDirections: function(directionsRequestObj){
     let directions = new google.maps.DirectionsService();
     let render = new google.maps.DirectionsRenderer();
     directions.route(directionsRequestObj, function(result, status){
       console.log(result);
      //  let actual = result.routes[0].legs[0];
      if(status === 'OK'){STORE.setStore('directionsResult', result)};
     });
  }
};
