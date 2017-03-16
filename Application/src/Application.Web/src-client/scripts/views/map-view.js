import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';

export const BasicMap = React.createClass({
  getDefaultProps: function(){
    return {
      defaultCenter: {lat: 32.784618, lng: -79.940918},
      defaultZoom: 4
    }
  },

  render: function(){
    return (
      <GoogleMapReact {...this.props}/>
    )
  }

});
