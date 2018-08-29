import React from 'react'
import {BasicMapView} from '../views/map-view.js'
import {ACTIONS} from '../actions.js'


export const FormComponent = React.createClass({

  componentWillUpdate: () => {
    const { oldRide } = this.props.inputRide;

    if(oldRide.origin !== undefined && oldRide.destination !== undefined){
      this.refs.search.value = oldRide.origin;
      this.refs.searchTwo.value = oldRide.destination;
    }
  },

  componentWillReceiveProps: (props) => {
    const { currentLocation, inputRide } = props;
    if(currentLocation && inputRide.origin === undefined){
      this.refs.search.value = currentLocation;
    }
  },

    _saveRides: (evt) => {
      evt.preventDefault();
      const newRide = evt.target.current.ridefield.value;
      ACTIONS.saveRide(newRide);
    },

    _saveHazards: (evt) => {
      evt.preventDefault();
      const { lat, lng } = this.props.hazardsToSave;
      const { value } = this.refs.hazardInfo;
      if(lat === undefined && lng === undefined){

      }else{
        const hazardObj = {
          type: value,
          latitude: lat,
          longitude: lng
        }
        ACTIONS.saveHazard(hazardObj);
        ACTIONS.goToSaved();
      }
    },

    _handleSave: (evt) => {
      const { rideName, search, searchTwo } = this.refs;
      const rideObj = {
        name: rideName.value,
        source: search.value,
        destination: searchTwo.value
      };
      ACTIONS.saveRide(rideObj);
      ACTIONS.goToSaved();
    },

    _handleAuto: (event, mapObj) => {
      const { mapEl } = this.props;
      const { search, searchTwo } = this.refs;
      ACTIONS.autoType(mapEl, search, searchTwo);
    },

    _handleSubmit: (evt) => {
      evt.preventDefault();
         const directionsRequest = {
           origin: evt.target.origin.value,
           destination: evt.target.dest.value,
           travelMode: 'BICYCLING',
           provideRouteAlternatives: true
        };
      ACTIONS.goToReminders();
      ACTIONS.getDirections(this.props.mapEl, directionsRequest);
      ACTIONS.getTime();
    },

    render: () => {
      const { mapEl } = this.props;
      return (
        <div className="input-form">
          <div className="input-form__ride">
            <form className="dir-form" onSubmit={this._handleSubmit}>
            <input onClick={(evt) => this._handleAuto(evt, mapEl)}
                   ref="search" type="text" placeholder="origin address" name="origin"></input>
            <input onClick={(evt) => this._handleAuto(evt, mapEl)}
                   ref="searchTwo" type="text" placeholder="destination address" name="dest"></input>
            <button type="submit" name="ridefield">Ride!</button>
          </form>
          </div>
            <form  className="input-form__hazard" onSubmit={this._saveHazards}>
              <input type="text" ref="hazardInfo" placeholder="hazard info"></input>
              <button className="savehaz" type="submit" name="hazardsfield">Save Hazards</button>
            </form>
            <div className="input-form__saveride">
              <input ref="rideName" type="text" placeholder="ride info" name="desc"></input>
              <button onClick={this._handleSave} className="saveroute" type="click" name="routesfield">Save Routes</button>
            </div>
        </div>
      )
  }

})
