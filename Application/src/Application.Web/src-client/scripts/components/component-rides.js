import React from 'react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const RideComponent = React.createClass({

  getDefaultProps: function(){
    return ACTIONS.getAllSavedRides();
  },

  _createRidesList: function(ridesArr){
    let mapIt = ridesArr.map(function(listEl, i){
      return <BuildRidesList {...listEl} key={i}/>
    });
    return mapIt;
  },

  // remove: function(){
  //
  // },

  render: function(){
    return (
            <div className="rides-list">
              <ul>
              {this._createRidesList(this.props.savedRides)}
              </ul>
            </div>
    )
  }
});

const BuildRidesList = React.createClass({

  _handleClick: function(evt, org, dest){
    ACTIONS.goToRide(org, dest);
  },

  _handleDelete: function(evt, index){

  },

  render: function(){
    return (
        <li>
            <p onClick={(evt) => this._handleClick(evt, this.props.source, this.props.destination)}>{this.props.source}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
               {this.props.destination}
            </p>
            <i onClick={(evt) => this._handleDelete(evt, index)}
               className="fa fa-trash-o" aria-hidden="true"></i>
        </li>
    )
  }
});
