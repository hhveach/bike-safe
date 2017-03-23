import React from 'react';
import GoogleMap from 'google-map-react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';
import {HazardsComponent} from '../components/component-hazards.js';

export const HazardsView = React.createClass({
  render: function(){
    return (
      <HazardsComponent {...this.props}/>
    )
  }
});
