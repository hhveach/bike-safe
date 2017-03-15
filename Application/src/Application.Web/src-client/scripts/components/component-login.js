import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';

export const LogInComponent = React.createClass({

  render: function(){
    return (
      <div>
        <h1>Bike Safe</h1>
        <form>
          <input type="text" placeholder="username"></input>
          <input type="password" placeholder="password"></input>
          <button type="submit">Log In</button>
        </form>
        <h2>or</h2>
        <button type="onClick">Sign Up</button>
      </div>
    )
  }
})
