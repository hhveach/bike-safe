import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14,
          markers: []
        };

  },


  _renderMapMarker: function(){
    if(this.props.hazardsToSave.lat === undefined && this.props.hazardsToSave.lng === undefined){
      return
    }else{
      // console.log(this.props)
      return(
        <MapMarker
          lat={this.props.hazardsToSave.lat}
          lng={this.props.hazardsToSave.lng}
          type={this.props.hazardsToSave.type}
        />
      )
    }
  },

  // _renderSavedHazards: function(){
  //   // let hazards = this.props.mapHazards
  //   ACTIONS.getAllHazards()
  // },

  _onMapClick: function(map){
    console.log(map.lat, map.lng,);
    console.log('wahht')
    let newHazardObj = {
      lat: map.lat,
      lng: map.lng
    };

    ACTIONS.setHazardToSave(newHazardObj)

    //Set store to newHazardObj
    //
    // let latitude = map.lat;
    // let longitude = map.lng;
    // let marker = new maps.Marker({
    //   position: {lat: map.lat, lng: map.lng},
    //   map: this.map
  // });

    // this.setState({
    //   markers: [...this.state.markers, <MapMarker lat={map.lat} lng={map.lng}/>]
    // })

  },
  render: function() {
    console.log(this.props.hazardsToSave, 'lat n long')
    return (<div className="first-map">
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['BicyclingLayer']}
        onClick={this._onMapClick}
      >
        {/* {this._renderSavedHazards()} */}
        {this._renderMapMarker()}
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
