import Backbone from 'backbone';

export const GoogleAPIModel = Backbone.Model.extend({
  urlRoot: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY&callback=initMap',
});
