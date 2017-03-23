import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const HazardsView = React.createClass({

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

    _onMapClick: function(map){
      console.log(map.lat, map.lng,);
      console.log('wahht')
      let newHazardObj = {
        lat: map.lat,
        lng: map.lng
      };

      ACTIONS.setHazardToSave(newHazardObj)

    },

    _makeSavedHazards: function(hazardsList){
      let arrayOfHazards = hazardsList.map( function(hmod, i){
        return (
        <HazardItem hazardData={hmod} key={i}/>
        )
      })
      return arrayOfHazards;
    },

    render: function() {
      let allHazards = this.props.mapHazards
      console.log(allHazards)
      // console.log(this.props.hazardsToSave, 'lat n long')
      return (<div className="first-map">
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
          layerTypes={['BicyclingLayer']}
          onClick={this._onMapClick}
        >
          {this._renderMapMarker()}
          <MapMarker lat={this.props.lat} lng={this.props.lng}/>
          {this.state.markers}
          {this._makeSavedHazards(allHazards)}
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
