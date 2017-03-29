import React from 'react';
import {RideComponent} from '../components/component-rides.js';

export const RidesView = React.createClass({
  render: function(){
    return (
            <div className="rides-view-container">
              <RideComponent {...this.props}/>
            </div>
         )
  }
});
