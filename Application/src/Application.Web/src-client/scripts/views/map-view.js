import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'
import {getViewCorners} from '../utils/utils-map.js'
import Autocomplete from '@google/maps';
import { maps } from '@google/maps';
import {SnazzyMapOptions} from '../utils/custom-map-build.js';



export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14,
          markers: [],
          mapObj: {}
        };

  },

  _handleMapLoaded: function(map, maps) {
    let cornerCoords = getViewCorners(map);
    ACTIONS.getAllSavedRides();
    ACTIONS.getAllHazards(cornerCoords);
    STORE.setStore('mapEl', {map, maps});
    ACTIONS.getLocation(this.props.mapEl);
  },

  _renderMapMarker: function(){
    if(this.props.hazardsToSave.lat === undefined && this.props.hazardsToSave.lng === undefined){
      return
    }else{
      return(
        <MapMarker
          lat={this.props.hazardsToSave.lat}
          lng={this.props.hazardsToSave.lng}
          type={this.props.mapHazards.type}
        />
      )
    }
  },

  _mapRender: function(haz){
    let hazardsMap = haz.map(function(listEl, i){
      return <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude} text={listEl.type} />
    });
    return hazardsMap;
  },

  _onMapClick: function(map){
    let newHazardObj = {
      lat: map.lat,
      lng: map.lng
    };

    ACTIONS.setHazardToSave(newHazardObj)

  },

  _onMarkerHover: function(hazType){
    let currentSelected = this.props.mapHazards[hazType]
    console.log(currentSelected)
    this.setState({ currentSelected: currentSelected})
  },

  _onMarkerLeave: function(index, hazType){
    let currentSelected = this.props.mapHazards[hazType]
    this.setState({ currentSelected: -1})
  },

  render: function() {
    // console.log(this.props.mapHazards, 'lat n long')
    return (<div className="first-map" style={{position: 'relative'}}>
      <GoogleMap
        options={{styles: SnazzyMapOptions}}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['BicyclingLayer']}
        onClick={this._onMapClick}
        onGoogleApiLoaded={({ map, maps }) => this._handleMapLoaded(map, maps)}
        // onGoogleApiLoaded={this._handleMapLoaded}
        yesIWantToUseGoogleMapApiInternals={true}
        onChildMouseEnter={this._onMarkerHover}
        onChildMouseLeave={this._onMarkerLeave}
        >
        {this._mapRender(this.props.mapHazards)}
        {this._renderMapMarker()}
        {/* <MapMarker
          lat={this.props.lat}
          lng={this.props.lng}
          text={this.props.type}
        /> */}
        {this.state.markers}


      </GoogleMap>
      <div className="info-box">
        {typeof this.state.currentSelected === 'undefined' ?   '---' : this.state.currentSelected.type }
      </div>
      </div>
    );
  }
});

const MapMarker = React.createClass({
  render: function(){
    return (
<<<<<<< HEAD
          <div className="marker">
            <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
          </div>
      )
=======
      <div className="marker">
        <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
      </div>
    )
>>>>>>> 910fa216accc2e2cacb41a4aa194081b46ecc74c
  }
})
