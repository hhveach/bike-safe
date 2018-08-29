import React from 'react';
import {FormComponent} from '../components/component-form.js';
import {RemindersComponent} from '../components/component-reminder.js';
import {BasicMapView} from './map-view.js';
import {SavedComponent} from '../components/component-saved.js';


export const HomeView = React.createClass({

  render: () => {
    return(
    <div>
      <SavedComponent {...this.props}/>

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
});
