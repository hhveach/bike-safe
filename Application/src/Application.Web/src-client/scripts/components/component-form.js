import React from 'react'
import {BasicMapView} from '../views/map-view.js'
import {ACTIONS} from '../actions.js'


export const FormComponent = React.createClass({

    _saveRides: function(evt){
      evt.preventDefault();
      let current = evt.target
      let newRide = current.ridefield.value
      ACTIONS.saveRide(newRide)
    },

    _saveHazards: function(evt){
      evt.preventDefault();
      if(this.props.hazardsToSave.lat === undefined){

      }else{
        console.log(this.props.hazardsToSave, 'hazard to saver')
        // ACTIONS.saveHazard(this.props.hazardToSave)
      }

    },

    render: function(){
      console.log(this.props)
      return (
        <div className="input-form">
            <input type="text" placeholder="origin address"></input>
            <input type="text" placeholder="destination address"></input>
            <button type="onSubmit" name="ridefield">Ride!</button>
            <button onClick={this._saveHazards} name="hazardsfield">Save Hazards</button>
            <button type="onClick" name="routesfield">Save Routes</button>
        </div>
      )
  }

})
