import React from 'react';
import {ACTIONS} from '../actions.js';

export const DirFormComponent = React.createClass({

  _handleSubmit: function(evt){
    evt.preventDefault();
       let directionsRequest = {
         origin: evt.target.origin.value,
         destination: evt.target.dest.value,
         travelMode: 'BICYCLING',
         provideRouteAlternatives: true
      };
    ACTIONS.getDirections(this.props.mapEl, directionsRequest);
  },

  render: function(){
    return (
      <div className="input-form">
        <form onSubmit={this._handleSubmit}>
          <input type="text" placeholder="origin address" name="origin"></input>
          <input type="text" placeholder="destination address" name="dest"></input>
          <button type="submit">Ride!</button>
        </form>
      </div>
    )
  }

})
