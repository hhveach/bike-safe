import React from 'react';
import {ACTIONS} from '../actions.js';
export const RemindersComponent = React.createClass({

  _handleClick: function(e){
    e.preventDefault();
    ACTIONS.goOnRide();
  },

  _createReminder: function(info){
    let safetyArr = ['Lock your bike up'];
    if(info.time >= 17){safetyArr.push('Turn your lights on')};
    if(info.day > 0 && info.day < 6){safetyArr.push('Be aware of weekday commuters')};
    if(info.day > 0 && info.day < 6 && info.time >= 15){safetyArr.push('Be aware of rush hour traffic')};
      let notices = safetyArr.map(function(listEl, index){
       return <li key={index}>{listEl}</li>
      });
    return notices;

  },

  render: function(){
    if(this.props.viewReminders === false){return null}
    else {
    return (<div className="reminder-container">
              <div className="reminder">
              <h1>Remember:</h1>
              <ul>
                {this._createReminder(this.props.rideTime)}
              </ul>
              <button onClick={(evt) => this._handleClick(evt)} type="click">Go On Your Ride!</button>
              </div>
            </div>
          )
        }
      }
});
