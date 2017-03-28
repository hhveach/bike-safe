import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';
import {HazardsComponent} from '../components/component-hazards.js';
import {HazListComponent} from '../components/component-haz-list.js';
import { maps } from '@google/maps';

export const HazardsView = React.createClass({

  render: function(){
    return (
      <div className="hazards-view-container">
        <div className= "map-view-container">
          <HazardsComponent {...this.props}/>
        </div>
        <div className="hazard-list-container">
          <HazListComponent {...this.props}/>
        </div>
      </div>
    )
  }
});
