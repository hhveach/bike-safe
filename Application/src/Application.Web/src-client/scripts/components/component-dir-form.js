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

  _handleAuto: function(event, mapObj){
    ACTIONS.autoType(this.props.mapEl, this.refs.search, this.refs.searchTwo)
  },

  render: function(){

    return (
      <div className="input-form">
        <form onSubmit={this._handleSubmit}>
          <input onKeyDown={(evt) => this._handleAuto(evt, this.props.mapEl)}
                 ref="search" type="text" placeholder="origin address" name="origin"></input>
          <input onKeyDown={(evt) => this._handleAuto(evt, this.props.mapEl)}
                 ref="searchTwo" type="text" placeholder="destination address" name="dest"></input>
          <button type="submit">Ride!</button>
        </form>
      </div>
    )
  }

})
