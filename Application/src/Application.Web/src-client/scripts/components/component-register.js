import React from 'react';
import {ACTIONS} from '../actions.js';

export const RegisterComponent = React.createClass({

  _handleSubmit: function(evt){
    evt.preventDefault();
    let current = evt.target;

    let registerObj = {
      name: current.name.value,
      email: current.email.value,
      password: current.password.value,
      image: current.profileImage.value,
      bike: current.bikeName.value
    };

    ACTIONS.userRegister(registerObj);
  },

  render: function(){
    return (
      <div className="register-container">
        <div className="input-form">
          <form onSubmit={this._handleSubmit}>
            <input type="text" name="name" placeholder="Username *"></input>
            <input type="text" name="email" placeholder="Email Address *"></input>
            <input type="text" name="password" placeholder="Password *"></input>
            {/* <input type="text" placeholder="Confirm Password"></input> */}
            <input type="text" name="profileImage" placeholder="Profile Image"></input>
            <button>Start Riding!</button>
          </form>
        </div>
      </div>
    )
  }
});
