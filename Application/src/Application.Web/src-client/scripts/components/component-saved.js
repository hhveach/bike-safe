import React from 'react';
import {ACTIONS} from '../actions.js';

export const SavedComponent = React.createClass({
  _handleClick: function(e){
    e.preventDefault();
    ACTIONS.goBackToHomeView();
  },

  render: function(){
    if(this.props.viewSaved === false){return null}
    else{
      return (
          <div className="saved">
            <h1>Hazard Saved!</h1>
            <button onClick={this._handleClick}>OK</button>
          </div>
      )
    }
  }
});
