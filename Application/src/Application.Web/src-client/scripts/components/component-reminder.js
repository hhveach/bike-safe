import React from 'react';
import {ACTIONS} from '../actions.js';
export const RemindersComponent = React.createClass({

  _handleClick: function(e){
    e.preventDefault();
    ACTIONS.goOnRide();
  },

  _createReminder: function(info){
    // if(info.time >= 17)//{//return nighttime lights on reminder}
    // if(info.day > 0 && info.day < 6)//{//return weekday general traffic warning}
    // if(info.day > 0 && info.day < 6 && info.time >= 15)//{//return weekday rush hour warning}

  },

  render: function(){
    if(this.props.viewReminders === false){return null}
    else {
    return (<div className="reminder-container">
              <div className="reminder">
              {/* <h1>{this._createReminder(this.props.rideTime)}</h1> */}
              <h1>Remember:</h1>
              <p>safety!</p>
              <p>safety!</p>
              <p>safety!</p>
              <p>safety!</p>
              <button onClick={(evt) => this._handleClick(evt)} type="click">Go On Your Ride!</button>
              </div>
            </div>
          )
        }
      }
});
