import React from 'react';
import GoogleMap from 'google-map-react';

export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14,
          markers: []
        };

  },

  _onMapClick: function(map){
    console.log(map.lat, map.lng,);
    // let newHazardObj = {
    //   newLat: obj.lat,
    //   newLong: obj.lng;
    // };
    // let latitude = map.lat;
    // let longitude = map.lng;
  //   let marker = new maps.Marker({
  //     position: {lat: map.lat, lng: map.lng},
  //     map: this.map
  // });

    this.setState({
      markers: [...this.state.markers, <MapMarker lat={map.lat} lng={map.lng}/>]
    })

  },
  render: function() {

    return (<div className="first-map">
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['BicyclingLayer']}
        onClick={this._onMapClick}
      >
        <MapMarker lat={this.props.lat} lng={this.props.lng}/>
        {this.state.markers}
      </GoogleMap>

      </div>
    );
  }
});

const MapMarker = React.createClass({
  render: function(){
    return <div>&#8671;</div>
  }
})
