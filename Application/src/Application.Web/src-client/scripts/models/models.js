import Backbone from 'backbone';

export const SingleRide = Backbone.Model.extend({
  urlRoot: '/api/consumer/rides',
  idAttribute: 'id',

  initialize: (id) => {
    if(id !== undefined){
      this.url = `/api/consumer/rides/${id}`;
    }
  }
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
  initialize : (viewCorners) => {
    const { upperLatitude, upperLongitude, lowerLatitude, lowerLongitude } = viewCorners;

    this.url = `/api/consumer/hazards?upperLatitude=${upperLatitude}&upperLongitude=${upperLongitude}&lowerLatitude=${lowerLatitude}&lowerLongitude=${lowerLongitude}`;
  }
});
