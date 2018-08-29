import React from 'react';
import {ACTIONS} from '../actions.js'

export const LogInComponent = React.createClass({

  _handleSubmit: (evt) => {
    evt.preventDefault();
    const emailVal = 'consumer@bike-safe.com';
    const passwordVal = 'qwer1234';
    ACTIONS.userLogin(emailVal, passwordVal);
  },

  _handleRegisterClick: (evt) => {
    evt.preventDefault();
    const hashRouteAndAppRouteName = 'register';
    ACTIONS.changeNav(hashRouteAndAppRouteName, hashRouteAndAppRouteName);
  },

  render: () => {
    return (
      <div className="log-in-container">
        <div className="login-form-container">
          <div className="login-form">
            <form onSubmit={this._handleSubmit}>
              <input type="text" placeholder="consumer@bike-safe.com" name="emailfield"></input>
              <input type="password" placeholder="qwer1234" name="passwordfield"></input>
              <button type="submit">Ride!</button>
            </form>
          </div>
          <h2>or</h2>
          <div className="login-form">
            <button data-route="register" onClick={this._handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    )
  }
});
