import React from 'react';
import GoogleMap from 'google-map-react';

export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14
        };

  },

  _onClick: function(obj){
    console.log(obj.lat, obj.lng,);
    // let newHazardObj = {
    //   newLat: obj.lat,
    //   newLong: obj.lng;
    // };
    let latitude = obj.lat;
    let longitude = obj.lng;
    let marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      // map: {GoogleMap}
  });

  },

  render: function() {

    return (<div className="first-map">
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['TrafficLayer', 'TransitLayer']}
        onClick={this._onClick}
      />
      </div>
    );
  }
});
