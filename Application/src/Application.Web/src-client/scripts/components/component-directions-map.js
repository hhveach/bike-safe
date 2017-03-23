import React from 'react';
import GoogleMap from 'google-map-react';
import {DirFormComponent} from './component-form.js';
import DirectionsRenderer from '@google/maps';
import { maps } from '@google/maps';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js'
export const DirectionsMapView = React.createClass({

  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14

          // navigator.geolocation.getCurrentPosition(function(position) {
          //   let center = {
          //     lat: position.coords.latitude,
          //     lng: position.coords.longitude
          //   };
          // }),
          };
  },

  _setMapToStore: function(map, maps){
    STORE.setStore("mapEl", {map, maps})
    // let service = new maps.places.PlacesService(map);
    // console.log(service)
  },

  // _renderTime: function(){
  //   console.log(this.props.duration, this.props.distance);
  //   return (
  //   <TravelInfo time={this.props.duration} length={this.props.distance}  />
  // )
  // },

  // navigator.geolocation.getCurrentPosition(function(position) {
  //   var pos = {
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude
  //   };
  // }),

  render: function() {
    return (
              <div className="first-map">
                <GoogleMap
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                  bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
                  layerTypes={['BicyclingLayer']}
                  onGoogleApiLoaded={({ map, maps }) => this._setMapToStore(map, maps)}
                  yesIWantToUseGoogleMapApiInternals
                >
                  {/* {this._renderTime()}
                  <TravelInfo dist={this.props.length} dur={this.props.time} LatLng={this.state.center}/> */}
                </GoogleMap>
              </div>
    );
  }
});

// const TravelInfo = React.createClass({
//   render: function(){
//     return (
//       <div><h1>{this.props.dist}</h1>
//                               <h1>{this.props.dur}</h1>
//                             </div>
//     )
//   }
// });