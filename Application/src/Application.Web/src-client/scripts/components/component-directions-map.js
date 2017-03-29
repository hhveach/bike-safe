// import React from 'react';
// import GoogleMap from 'google-map-react';
// import {DirFormComponent} from './component-form.js';
// import {ACTIONS} from '../actions.js';
// import {STORE} from '../store.js'
// 
// export const DirectionsMapView = React.createClass({
//
//   getInitialState: function(){
//   return  {
//           center: {lat: 32.7846418, lng: -79.940918},
//           zoom: 14
//           };
//   },
//
//   _setMapToStore: function(map, maps){
//     STORE.setStore("mapEl", {map, maps});
//     ACTIONS.getLocation(this.props.mapEl);
//   },
//
//   render: function() {
//     return (
//               <div className="first-map">
//                 <GoogleMap
//                   defaultCenter={this.state.center}
//                   defaultZoom={this.state.zoom}
//                   bootstrapURLKeys={{key: 'AIzaSyBx7EjgwkDfaGFJ0JhbRa_l4jkEPXloFuU'}}
//                   layerTypes={['BicyclingLayer']}
//                   onGoogleApiLoaded={({ map, maps }) => this._setMapToStore(map, maps)}
//                   yesIWantToUseGoogleMapApiInternals
//                 >
//                 </GoogleMap>
//               </div>
//     );
//   }
// });
