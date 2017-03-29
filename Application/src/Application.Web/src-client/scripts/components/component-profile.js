import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import $ from 'jquery';

export const ProfileComponent = React.createClass({

  _handleProfileBuild: function(userObject){
    ACTIONS.getAllSavedRides();
    let image = userObject.image;
    let nm = userObject.name;
    if(image === null){
      image = `http://flathash.com/${nm}`;
    };

      return (  <div className="profile">
                  <div className="profile-img">
                    <h1><i className="fa fa-user-circle" aria-hidden="true"></i> {userObject.name}</h1>
                    <img src={image}/>
                  </div>
                  <div className="profile-info">
                    <h1><i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                     Hazards Identified: {this.props.mapHazards.length}
                   </h1>
                    <h1><i className="fa fa-bicycle" aria-hidden="true"></i>
                     My Rides: {this.props.savedRides.length}
                   </h1>
                  </div>
                </div>
      )
  },

  render: function(){
    return (
    <div className="profile-container">
        {this._handleProfileBuild(this.props.currentUser)}
    </div>
    )
  }
});
