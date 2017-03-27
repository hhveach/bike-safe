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

    _mapRender: function(haz){
      let hazardsMap = haz.map(function(listEl, i){
        // let wind = new mapObj.maps.InfoWindow();
        // wind.setContent(listEl.type);
        // wind.setPosition(listEl.latitude, listEl.longitude);
        // wind.open(mapObj.maps);
        return <MapMarker key={i} lat={listEl.latitude} lng={listEl.longitude}/>
      });
      return hazardsMap;
    },

    render: function() {
      return (<div className="first-map">
        <GoogleMap
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
          layerTypes={['BicyclingLayer']}
        >
          {this._mapRender(this.props.mapHazards)}
          <MapMarker lat={this.props.lat} lng={this.props.lng}/>
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
