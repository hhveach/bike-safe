import React from 'react';
import {LogInComponent} from '../components/component-login.js'

  export const LoginView = React.createClass({
    render: function(){
      return (
        <div className="login-container">
          <LogInComponent/>
        </div>
      )
    }
  })
