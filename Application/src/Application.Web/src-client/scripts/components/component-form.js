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

    render: function(){
      // console.log(this.props)
      return (
        <div className="input-form">
          <div className="input-form__ride">
            <input type="text" placeholder="origin address"></input>
            <input className="destination" type="text" placeholder="destination address"></input>
            <button type="onSubmit" name="ridefield">Ride!</button>
          </div>
            <form  className="input-form__hazard" onSubmit={this._saveHazards}>
              <input type="text" ref="hazardInfo" placeholder="hazard info"></input>
              <button className="savehaz" type="submit" name="hazardsfield">Save Hazards</button>
            </form>
            <div className="input-form__saveride">
              <input type="text" placeholder="ride info"></input>
              <button className="saveroute" type="onClick" name="routesfield">Save Routes</button>
            </div>
        </div>
      )
  }

})
