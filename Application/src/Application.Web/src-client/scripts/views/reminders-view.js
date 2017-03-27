import React from 'react';
import {RemindersComponent} from '../components/component-reminder.js';

export const RemindersView = React.createClass({
  render: function(){
    return (
            <div>
              <RemindersComponent {...this.props}/>
            </div>
  )
  }
});
