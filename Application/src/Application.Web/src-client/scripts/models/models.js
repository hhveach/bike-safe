import Backbone from 'backbone';

// export const GoogleAPIModel = Backbone.Model.extend({
//   // urlRoot: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY&callback=initMap',
// });

export const SingleRide = Backbone.Model.extend({
  urlRoot: '/api/rides',
  idAttribute: 'id'
});

export const AllRides = Backbone.Collection.extend({
  model: SingleRide,
  url: '/api/rides'
});


export const SingleHazard = Backbone.Model.extend({
  urlRoot: '/api/hazards',
  idAttribute: 'id'
});

export const AllHazards = Backbone.Collection.extend({
  model: SingleHazard,
  url: '/api/hazards'
});
