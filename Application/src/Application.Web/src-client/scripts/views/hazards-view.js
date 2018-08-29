import React from 'react';
import {HazardsComponent} from '../components/component-hazards.js';
import {HazListComponent} from '../components/component-haz-list.js';

export const HazardsView = React.createClass({

  render: () => {
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
