import React from 'react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const RideComponent = React.createClass({

  render: function(){
    ACTIONS.getAllSavedRides();
    return (
            <div className="rides-list">
              <h1>My Rides</h1>
              <h2>{this.props.currentUser.name}</h2>
              <BuildRidesList rides={this.props.savedRides}/>
            </div>
    )
  }
});

const BuildRidesList = React.createClass({

  _createRidesList: function(ridesArr){
    let comp = this;
    let mapIt = ridesArr.map(function(listEl, index){
      if(listEl.name === ""){listEl.name = 'Ride'}
      return (
            <li key={index}>
              <h4>&middot; {listEl.name} &middot;</h4>
              <p><i className="fa fa-bicycle" aria-hidden="true"></i> {listEl.source}</p>
              <p><i className="fa fa-long-arrow-right" aria-hidden="true"></i> {listEl.destination}</p>

              <button className="ride-btn" onClick={() => comp._handleClick(listEl.source, listEl.destination)}>
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
              <button className="ride-btn" onClick={() => comp._handleDelete(listEl.id)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </li>
          )
    });
    return mapIt;
  },

  _handleClick: function(org, dest){
    ACTIONS.goToRide(org, dest);
  },

  _handleDelete: function(id){
    ACTIONS.deleteRide(id);
  },

  render: function(){
    return (<ul>
              {this._createRidesList(this.props.rides)}
            </ul>
    )
  }
});
