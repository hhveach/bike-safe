import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';
import {getViewCorners} from '../utils/utils-map.js';
import {SnazzyMapOptions} from '../utils/custom-map-build.js';

export const HazardsComponent = React.createClass({

    getInitialState: () => {
    return  {
            center: {lat: 32.7846418, lng: -79.940918},
            zoom: 14,
            markers: [],
            mapObj: {}
          };
    },

    _handleMapLoaded: (map, maps) => {
      const cornerCoords = getViewCorners(map);
      ACTIONS.getAllHazards(cornerCoords);
      STORE.setStore('mapEl', {map, maps});
    },

    _renderMapMarker: () => {
      const { hazardsToSave, mapHazards } = this.props;
      if(hazardsToSave.lat === undefined && hazardsToSave.lng === undefined){
        return;
      }else{
        return(
          <MapMarker
            lat={hazardsToSave.lat}
            lng={hazardsToSave.lng}
            type={mapHazards.type}
          />
        )
      }
    },

    _onMarkerHover: (hazType) => {
      const currentSelected = this.props.mapHazards[hazType];
      this.setState({ currentSelected: currentSelected});
    },

    _onMarkerLeave: (index, hazType) => {
      const currentSelected = this.props.mapHazards[hazType];
      this.setState({ currentSelected: -1});
    },

    _mapRender: (haz) => {
      const hazardsMap = haz.map((listEl, i) => 
        <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude} text={listEl.type}/>
      );
      return hazardsMap;
    },

    render: function() {
      const { mapHazards } = this.props;
      const { center, zoom, markers, currentSelected } = this.state;
      return (<div className="first-map" style={{position: 'relative'}}>
        <GoogleMap
          options={{styles: SnazzyMapOptions}}
          defaultCenter={center}
          defaultZoom={zoom}
          bootstrapURLKeys={{key: 'AIzaSyBx7EjgwkDfaGFJ0JhbRa_l4jkEPXloFuU'}}
          layerTypes={['BicyclingLayer']}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this._handleMapLoaded(map, maps)}
          onChildMouseEnter={this._onMarkerHover}
          onChildMouseLeave={this._onMarkerLeave}
        >
          {this._mapRender(mapHazards)}
          {this._renderMapMarker()}
          {/* <MapMarker
            lat={this.props.lat}
            lng={this.props.lng}
            text={this.props.type}
          /> */}
          {markers}


        </GoogleMap>
        <div className="info-box">
          {typeof currentSelected === 'undefined' ?   '---' : currentSelected.type }
        </div>
        </div>
      );
    }
  });

  const MapMarker = React.createClass({
    render: () => {
      return (
        <div className="marker">
          <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
        </div>
      )
    }
  });
