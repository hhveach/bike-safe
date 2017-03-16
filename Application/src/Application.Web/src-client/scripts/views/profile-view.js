import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
//import {ProfileComponent} from './components/component-profile.js';

export const ProfileView = React.createClass({

  getInitialState: function(){
    ACTIONS.getUser();
    let storeInfo = STORE.getStore();
      return storeInfo;
  },

  _handleProfileBuild: function(userObject){
    let user = userObject.map(function(listEl){
      return <ProfileJSX {...listEl}/>;
    })
    return user;

  },

  render: function(){
    return (
    <div>
        {this._handleProfileBuild(this.props.currentUser)}
    </div>
    )
  }
});

const ProfileJSX = React.createClass({
  render: function(){
    return (
        <div className="profile">
          <img src={this.props.avatarImg}/>
          <h2>{this.props.username}</h2>
          <div className="rides">{this.props.savedRides}</div>
          <div className="hazards">{this.props.mapHazards}</div>
        </div>
    )
  }
});
