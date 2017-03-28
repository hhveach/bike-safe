import React from 'react';
import {ACTIONS} from '../actions.js'

export const LogInComponent = React.createClass({

  _handleSubmit: function(evt){
    evt.preventDefault();
    let formEl = evt.target;
    let emailVal = formEl.emailfield.value
    let passwordVal = formEl.passwordfield.value
    ACTIONS.userLogin(emailVal, passwordVal);
  },

  _handleRegisterClick: function(evt){
    evt.preventDefault();
    let hashRoute = 'register'
    let appRouteName = 'register'
    ACTIONS.changeNav(appRouteName, hashRoute)
  },

  render: function(){
    return (
      <div className="log-in-container">
        <div className="login-form-container">
          <div className="login-form">
            <form onSubmit={this._handleSubmit}>
              <input type="text" placeholder="email" name="emailfield"></input>
              <input type="text" placeholder="password" name="passwordfield"></input>
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
})
