import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import $ from 'jquery';

export const ProfileComponent = React.createClass({

  _handleProfileBuild: function(userObject){
    let image = userObject.image;
    let nm = userObject.name;
    if(image === null){
      image = `http://flathash.com/${nm}`;
    }

      return (  <div className="profile">
                  <img src={image}/>
                  <h1>{userObject.email}</h1>
                  <h1>{userObject.name}</h1>
                </div>
      )
  },

  render: function(){
    return (
    <div>
        {this._handleProfileBuild(this.props.currentUser)}
    </div>
    )
  }
});
