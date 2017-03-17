import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';

export const ProfileComponent = React.createClass({

  _handleProfileBuild: function(userObject){
      return (  <div className="profile">
                  <h1>{userObject.email}</h1>
                </div>
      )
  },

  render: function(){
    return (
    <div>
        {this._handleProfileBuild(this.props.user)}
    </div>
    )
  }
});

// const ProfileJSX = React.createClass({
//   render: function(){
//     return (
//         <div className="profile">
//           <img src={this.props.avatarImg}/>
//           <h2>{this.props.username}</h2>
//           <div className="rides">{this.props.savedRides}</div>
//           <div className="hazards">{this.props.mapHazards}</div>
//         </div>
//     )
//   }
// });
