import React from 'react';
import {ProfileComponent} from '../components/component-profile.js';

export const ProfileView = React.createClass({
  render: function(){
    return ( <div>
              <ProfileComponent {...this.props}/>
             </div>
          )
  }
});
