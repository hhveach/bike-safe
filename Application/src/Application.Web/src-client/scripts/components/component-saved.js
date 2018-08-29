import React from 'react';
import {ACTIONS} from '../actions.js';

export const SavedComponent = React.createClass({
  _handleClick: (e) => {
    e.preventDefault();
    ACTIONS.goBackToHomeView();
  },

  render: () => {
    const { viewSaved } = this.props;
    if(!viewSaved){
      return null;
    }
    else{
      return (
          <div className="saved">
            <h1>Saved!</h1>
            <button onClick={this._handleClick}>OK</button>
          </div>
      )
    }
  }
});
