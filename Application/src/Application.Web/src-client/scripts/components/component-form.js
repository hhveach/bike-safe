import React from 'react'
import {BasicMapView} from '../views/map-view.js'
import {ACTIONS} from '../actions.js'


export const FormComponent = React.createClass({

  componentWillUpdate: function(){
    let oldRide = this.props.inputRide;

    if(oldRide.origin !== undefined && oldRide.destination !== undefined){
      this.refs.search.value = oldRide.origin;
      this.refs.searchTwo.value = oldRide.destination;
      }
  },

  componentWillReceiveProps: function(props){
    let saved = props.inputRide.origin;
    if(props.currentLocation && saved === undefined){
      this.refs.search.value = props.currentLocation;
    }
  },

    _saveRides: function(evt){
      evt.preventDefault();
      let current = evt.target
      let newRide = current.ridefield.value
      ACTIONS.saveRide(newRide)
    },

    _saveHazards: function(evt){
      evt.preventDefault();
      console.log([evt.target])
      if(this.props.hazardsToSave.lat === undefined && this.props.hazardsToSave.lng === undefined){

      }else{
        console.log(this.refs, 'hazard to save')
        let hazardObj = {
          type: this.refs.hazardInfo.value,
          latitude: this.props.hazardsToSave.lat,
          longitude: this.props.hazardsToSave.lng
        }
        console.log(hazardObj)
        ACTIONS.saveHazard(hazardObj)
      }

    },

    _handleSave: function(evt){
      let rideObj = {
        name: this.refs.rideName.value,
        source: this.refs.search.value,
        destination: this.refs.searchTwo.value
      };
      ACTIONS.saveRide(rideObj);
    },

    _handleAuto: function(event, mapObj){
      ACTIONS.autoType(this.props.mapEl, this.refs.search, this.refs.searchTwo)
    },

    _handleSubmit: function(evt){
      evt.preventDefault();
         let directionsRequest = {
           origin: evt.target.origin.value,
           destination: evt.target.dest.value,
           travelMode: 'BICYCLING',
           provideRouteAlternatives: true
        };
      ACTIONS.goToReminders();
      ACTIONS.getDirections(this.props.mapEl, directionsRequest);
      ACTIONS.getTime();
    },

    render: function(){
      // console.log(this.props)
      return (
        <div className="input-form">
          <div className="input-form__ride">
            <form onSubmit={this._handleSubmit}>
            <input onClick={(evt) => this._handleAuto(evt, this.props.mapEl)}
                   ref="search" type="text" placeholder="origin address" name="origin"></input>
            <input onClick={(evt) => this._handleAuto(evt, this.props.mapEl)}
                   ref="searchTwo" className="destination" type="text" placeholder="destination address" name="dest"></input>
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
