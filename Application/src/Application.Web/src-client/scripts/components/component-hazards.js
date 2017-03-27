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
      });
      return hazardsMap;
    },

    render: function() {
      let allHazards = this.props.mapHazards
      // console.log(allHazards)
      // console.log(this.props.hazardsToSave, 'lat n long')
      return (<div className="first-map">
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
          layerTypes={['BicyclingLayer']}
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
