import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';
import {getViewCorners} from '../utils/utils-map.js'
import { maps } from '@google/maps';
import {SnazzyMapOptions} from '../utils/custom-map-build.js';

export const HazardsComponent = React.createClass({

    getInitialState: function(){
    return  {
            center: {lat: 32.7846418, lng: -79.940918},
            zoom: 14,
            markers: [],
            mapObj: {}
          };
    },

    _handleMapLoaded: function(map, maps) {
      console.log(map)
      let cornerCoords = getViewCorners(map);
      ACTIONS.getAllHazards(cornerCoords);
      STORE.setStore('mapEl', {map, maps})
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
            type={this.props.mapHazards.type}
          />
        )
      }
    },

    _onMarkerHover: function(hazType){
      let currentSelected = this.props.mapHazards[hazType]
      this.setState({ currentSelected: currentSelected})
    },

    _onMarkerLeave: function(index, hazType){
      let currentSelected = this.props.mapHazards[hazType]
      this.setState({ currentSelected: -1})

    },

    _mapRender: function(haz){
      // ACTIONS.getAllHazards(this.props.viewCorners)
      // let haz = this.props.mapHazards;
      // console.log(haz)
      let hazardsMap = haz.map(function(listEl, i){
        return <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude} text={listEl.type}/>
      });
      return hazardsMap;
    },

    render: function() {
      let allHazards = this.props.mapHazards
      // console.log(allHazards)
      // console.log(this.props.hazardsToSave, 'lat n long')
      return (<div className="first-map" style={{position: 'relative'}}>
        <GoogleMap
          options={{styles: SnazzyMapOptions}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: 'AIzaSyBx7EjgwkDfaGFJ0JhbRa_l4jkEPXloFuU'}}
          layerTypes={['BicyclingLayer']}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this._handleMapLoaded(map, maps)}
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
        <div className="marker">
          <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
        </div>
      )
    }
  })
