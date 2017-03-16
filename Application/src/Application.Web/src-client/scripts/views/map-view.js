import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';

export const MapInitialTry = React.createClass({
  render: function(){
    return <div className="initial-map"></div>
  }
});

export const BasicMap = React.createClass({

  getDefaultProps: function(){
    return {
      center: {lat: 32.784618, lng: -79.940918},
      zoom: 4
    }
  },

  render: function(){
            <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
              <MapInitialTry lat={59.955413} lng={30.337844}/>
            </GoogleMapReact>

  }
});
