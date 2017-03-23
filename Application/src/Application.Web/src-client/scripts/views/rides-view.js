import React from 'react';
import {RideComponent} from '../components/component-rides.js';

export const RidesView = React.createClass({
  render: function(){
    return (
            <div>
              <RideComponent {...this.props}/>
            </div>
         )
  }
});
