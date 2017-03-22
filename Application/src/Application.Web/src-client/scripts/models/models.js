import Backbone from 'backbone';

export const SingleRide = Backbone.Model.extend({
  urlRoot: '/api/rides',
  idAttribute: 'id'
});

export const AllRides = Backbone.Collection.extend({
  model: SingleRide,
  url: '/api/rides'
});


export const SingleHazard = Backbone.Model.extend({
  urlRoot: '/api/consumer/hazards',
  idAttribute: 'id'
});

export const AllHazards = Backbone.Collection.extend({
  model: SingleHazard,
  url: '/api/consumer/hazards'
});
