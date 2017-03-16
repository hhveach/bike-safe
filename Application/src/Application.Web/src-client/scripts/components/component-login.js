import React from 'react';
import {ACTIONS} from '../actions.js'

export const LogInComponent = React.createClass({

  _handleSubmit: function(evt){
    evt.preventDefault();
    let formEl = evt.target;
    console.log(formEl)
    let emailVal = formEl.emailfield.value
    let passwordVal = formEl.passwordfield.value
    ACTIONS.userLogin(emailVal, passwordVal);
  },

  render: function(){
    return (
      <div className="log-in-container">
        <h1>Bike Safe</h1>
        <div className="input-form">
          <form onSubmit={this._handleSubmit}>
            <input type="text" placeholder="email" name="emailfield"></input>
            <input type="text" placeholder="password" name="passwordfield"></input>
            <button type="onSubmit">Ride!</button>
          </form>
        </div>
        <h2>or</h2>
        <div className="input-form">
          <button type="onClick">Sign Up</button>
        </div>
      </div>
    )
  }
})
