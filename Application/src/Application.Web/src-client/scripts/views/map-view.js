import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const BasicMapView = React.createClass({
  getdefaultProps: function(){
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
});

// export const BasicMapView = React.createClass({
//   render: function(){
// return (
//             <Map google={this.props.google} zoom={14}>
//
//               {/* <Marker onClick={this.onMarkerClick}
//                       name={'Current location'} /> */}
//           </Map>
// )
// }
// });
