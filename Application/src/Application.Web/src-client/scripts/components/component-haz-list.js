import React, { Component } from 'react';
import {ACTIONS} from '../actions.js';

export default class HazListComponent extends Component{
  render = () => {
    const { mapHazards } = this.props;
    return (
      <div>
        <HazItems hazItems={mapHazards}/>
      </div>
    )
  }
};

class HazItems extends Component {
  _handleHazDelete = (evt) => {
    ACTIONS.deleteHaz(evt.target.dataset.hazid);
  };

  _createHazardsList = (haz) => {
    const hazMap = haz.map((listEl, ind) => {
      return (
            <div className="haz-list">
              <li key={ind}>
                <p>{listEl.type}</p>
                <i onClick={this._handleHazDelete} data-hazid={listEl.id} className="fa fa-trash-o" aria-hidden="true"/>
              </li>
            </div>
      )
    });
    return hazMap;
  };

  render = () =>  {
    const { hazItems } = this.props;
    return (
          <div>
            <h1>Your hazard contributions</h1>
            <ul>
              {this._createHazardsList(hazItems)}
            </ul>
          </div>
    )
  }
};
