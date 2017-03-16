import React from 'react';
import {STORE} from '../store.js';
import {ACTIONS} from '../actions.js';
import {ProfileComponent} from '../components/component-profile.js';

export const ProfileView = React.createClass({
  render: function(){
    return ( <div>
              <ProfileComponent user={this.props.currentUser}/>
             </div>
          )
  }
});
