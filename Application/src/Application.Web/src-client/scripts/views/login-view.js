import React from 'react';
import {LogInComponent} from '../components/component-login.js'

  export const LoginView = React.createClass({
    render: () => {
      return (
        <div className="login-container">
          <LogInComponent/>
        </div>
      )
    }
  });
