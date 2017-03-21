import React from 'react';
import GoogleMap from 'google-map-react';
import {DirFormComponent} from '../components/component-dir-form.js';
import {DirectionsMapView} from '../components/component-directions-map.js';

export const DirectionsView = React.createClass({
  render: function(){
    return (
      <div>
        <DirFormComponent {...this.props}/>
        <DirectionsMapView {...this.props}/>
      </div>
    )

  }
});
