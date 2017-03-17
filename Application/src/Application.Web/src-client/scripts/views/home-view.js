import React from 'react';
import {NavComponent} from '../components/component-nav.js'
import {FormComponent} from '../components/component-form.js'
import {BasicMapView} from './map-view.js'

export const HomeView = React.createClass({
  render: function(){
    return(
    <div>
      <div className="home-view-container">
        <BasicMapView/>
        <h1>Ride It Out</h1>
        <FormComponent/>
      </div>
    </div>
  )
  }
})
