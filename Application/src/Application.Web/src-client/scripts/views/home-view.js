import React from 'react';
import {NavComponent} from '../components/component-nav.js'
import {FormComponent} from '../components/component-form.js'
import {RemindersComponent} from '../components/component-reminder.js';
import {BasicMapView} from './map-view.js'

export const HomeView = React.createClass({
  render: function(){

    return(
    <div>
      <RemindersComponent {...this.props}/>
      <div className="home-view-container">
        <div className="map-view-container">
          <BasicMapView {...this.props}/>
        </div>
        <div className="map-form-container">
          <h1>Ride It Out</h1>
          <FormComponent {...this.props}/>
        </div>
      </div>
    </div>
  )
  }
})
