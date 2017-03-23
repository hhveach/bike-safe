import Backbone from 'backbone';
import {STORE} from '../store.js';
import React from 'react';

export const SingleRide = Backbone.Model.extend({
  urlRoot: '/api/consumer/rides',
  idAttribute: 'id'
});

export const AllRides = Backbone.Collection.extend({
  model: SingleRide,
  url: '/api/consumer/rides'
});


export const SingleHazard = Backbone.Model.extend({
  urlRoot: '/api/consumer/hazards',
  idAttribute: 'id'
});

export const AllHazards = Backbone.Collection.extend({
  model: SingleHazard,
  initialize : function(viewCorners){

    let upperLatitude = viewCorners.upperLatitude
    let upperLongitude = viewCorners.upperLongitude
    let lowerLatitude = viewCorners.lowerLatitude
    let lowerLongitude = viewCorners.lowerLongitude

    this.url = `/api/consumer/hazards?upperLatitude=${upperLatitude}&upperLongitude=${upperLongitude}&lowerLatitude=${lowerLatitude}&lowerLongitude=${lowerLongitude}`
  }
});
