import React from 'react';
import GoogleMap from 'google-map-react';
import {DirFormComponent} from './component-form.js';
import DirectionsRenderer from '@google/maps';
import google from '@google/maps';

export const DirectionsMapView = React.createClass({

  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14
          };
  },

  // componentDidMount: function(){
  //   let directionsDisplay = new google.maps.DirectionsRenderer();
  //   directionsDisplay.setMap();
  //   directionsDisplay.setDirections(this.props.directionsResult);
  // },

  render: function() {

    return (
              <div className="first-map">
                <GoogleMap
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                  bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
                  layerTypes={['BicyclingLayer']}
                >
                {/* <Directions dir={this.props.directionsResult} ref={<GoogleMap/>}/> */}
                </GoogleMap>
              </div>
    );
  }
});

// export const Directions = React.createClass({
//
//   render: function(){
//     return (
//         <div>
//          {this.props.dir}
//         </div>
//     );
//   }
//
// });
