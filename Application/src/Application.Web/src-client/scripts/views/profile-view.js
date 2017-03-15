import React from 'react';
import {STORE} from './scripts/store.js';
import {ACTIONS} from './scripts/actions.js';

export const ProfileView = React.createClass({

  getInitialState: function(){
    return STORE.getStore();
  }

  _handleProfileBuild: function(userObject){
      //or return ACTIONS.getUser();
    let user = userObject.map(function(listEl){

    })
    return user;

  },

  render: function(){
    return (
    <div>
        {this._handleProfileBuild(userObj)}
    </div>
    )
  }
});

// const ProfileJSXBuild = React.createClass({
//   render: function(){
//     return (
//             <div className="">
//               <img src={}/>
//
//
//             </div>
//     )
//   }
// });
