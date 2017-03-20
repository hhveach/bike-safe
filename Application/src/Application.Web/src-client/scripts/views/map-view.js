import React from 'react';
import GoogleMap from 'google-map-react';

export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14
        };

  },

  _onMapClick: function(map, maps){
    console.log(map.lat, map.lng,);
    console.log(map);
    console.log(maps);
    // let newHazardObj = {
    //   newLat: obj.lat,
    //   newLong: obj.lng;
    // };
    // let latitude = map.lat;
    // let longitude = map.lng;
    let marker = new maps.Marker({
      position: {lat: map.lat, lng: map.lng},
      map: map
  });

  },

//   renderMarkers(map, maps) {
//   let marker = new maps.Marker({
//     position: myLatLng,
//     map,
//     title: 'Hello World!'
//   });
// }

  render: function() {

    return (<div className="first-map">
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['TrafficLayer', 'TransitLayer']}
        onClick={this._onMapClick}
        onGoogleApiLoaded={({map, maps}) => this._onMapClick(map, maps)}
        yesIWantToUseGoogleMapApiInternals
      />
      </div>
    );
  }
});
