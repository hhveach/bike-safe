import React from 'react';
import {STORE} from './scripts/store.js';
import {ACTIONS} from './scripts/actions.js';
//import {ProfileComponent} from './components/component-profile.js';

export const ProfileView = React.createClass({

  getInitialState: function(){
    return STORE.getStore();
  },

  _handleProfileBuild: function(userObject){
      //ACTIONS.getUser();
    let user = userObject.map(function(listEl){
      return <ProfileJSX {...listEl}/>;
    })
    return user;

  },

  render: function(){
    return (
    <div>
        {this._handleProfileBuild(this.state.currentUser)}
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
          <div className="rides"></div>
          <div className="hazards"></div>
        </div>
    )
  }

});
