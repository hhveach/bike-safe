import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import {FormComponent} from './component-form.js'

export const LogInComponent = React.createClass({

  render: function(){
    return (
      <div>
        <h1>Bike Safe</h1>
        <FormComponent/>
        <h2>or</h2>
        <button type="onClick">Sign Up</button>
      </div>
    )
  }
})
