// import Backbone from 'backbone';
// import ReactDOM from 'react-dom';
// import React from 'react';
import {STORE} from './store.js';
import {SingleRide, AllRides, SingleHazard, AllHazards} from './models/models.js';
import {UserModel} from './models/model-user.js';

export const ACTIONS = {

  changeNav: function(selectedRoute, urlHash){
    STORE.setStore('currentRoute': selectedRoute);
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
    rides.map(function(listEl){
      if(rideId === listEl._id){
        return listEl;
      }
    })
  },

  getAllSavedRides: function(){
    let rides = new AllRides();
      rides.fetch().then(function(serverRes){
      })
  },

  saveHazard: function(newHazard){
    let bad = new SingleHazard();
      bad.set(newHazard);
      bad.save().then(functin(serverRes){
      });
  },

  getSingleHazard: function(){

  },

  getAllHazards: function(){

  },

  userLogin: function(){
    //UserModel.logIn
  },

  userRegister: function(){
    //UserModel.register
  },

  userLogout: function(){
      //UserModel.logOut
  },

  getUser: function(){
      //UserModel.getCurrentUser
  }
};
