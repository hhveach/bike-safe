import React from 'react';
import {RegisterComponent} from '../components/component-register.js';

export const RegisterView = React.createClass({

  render: function(){
    return (<div>
              <img className="logo" src="./images/bike-safe-logo.png"/>
              <RegisterComponent/>
            </div>
    )
  }
});
