import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const HazardsComponent = React.createClass({

    getInitialState: function(){
    return  {
            center: {lat: 32.7846418, lng: -79.940918},
            zoom: 14
          };
    },

<<<<<<< HEAD
    _mapRender: function(haz){
      let hazardsMap = haz.map(function(listEl, i){
        // let wind = new mapObj.maps.InfoWindow();
        // wind.setContent(listEl.type);
        // wind.setPosition(listEl.latitude, listEl.longitude);
        // wind.open(mapObj.maps);
        return <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude}/>
=======
    _setMapToStore: function(map, maps){
      STORE.setStore("mapEl", {map, maps})
    },

    _showInfoWindow: function(evt){
      let haz = this.props.mapHazards;
      ACTIONS.createInfoWindow(this.props.mapEl, this.props.mapHazards)
    },

    _mapRender: function(haz){
      // ACTIONS.getAllHazards(this.props.viewCorners)
      // let haz = this.props.mapHazards;
      // console.log(haz)
      let hazardsMap = haz.map(function(listEl, i){
        return <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude} type={listEl.type}/>
>>>>>>> f7be34e9004a17a19bd091c58fb17b2d370b3b90
      });
      return hazardsMap;
    },

    render: function() {
<<<<<<< HEAD
=======
      let allHazards = this.props.mapHazards
      // console.log(allHazards)
      // console.log(this.props.hazardsToSave, 'lat n long')
>>>>>>> f7be34e9004a17a19bd091c58fb17b2d370b3b90
      return (<div className="first-map">
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
          layerTypes={['BicyclingLayer']}
<<<<<<< HEAD
        >
          {this._mapRender(this.props.mapHazards)}
          <MapMarker lat={this.props.lat} lng={this.props.lng}/>
=======
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this._setMapToStore(map, maps)}
          // onClick={this._onMapClick}
        >
          {this._mapRender(this.props.mapHazards)}
          <MapMarker lat={this.props.lat} lng={this.props.lng}
          onHover={this._showInfoWindow()}
          />
          {/* {this.state.markers} */}
          {/* {this._makeSavedHazards(allHazards)} */}
          {/* <HazardItem/> */}
>>>>>>> f7be34e9004a17a19bd091c58fb17b2d370b3b90
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
