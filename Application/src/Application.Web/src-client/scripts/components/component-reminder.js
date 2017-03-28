import React from 'react';
import {ACTIONS} from '../actions.js';
export const RemindersComponent = React.createClass({

  _handleClick: function(e){
    e.preventDefault();
    ACTIONS.goOnRide();
  },

  _createReminder: function(info){
    let safetyArr = [];
    if(info.time >= 17 && info.time <= 7)
      {safetyArr.push('EVENING: Turn your lights on')};
    if(info.day > 0 && info.day < 6 && info.time <= 19 && info.time >= 6)
      {safetyArr.push('WEEKDAY: Be aware of commuters')};
    if(info.day > 0 && info.day < 6 && info.time >= 15 && info.time <= 19)
      {safetyArr.push('RUSH HOUR (EVENING): Be aware of traffic')};
    if(info.day > 0 && info.day < 6 && info.time >= 6 && info.time <= 9)
      {safetyArr.push('RUSH HOUR (MORNING): Be aware of traffic')};
    if(info.day < 1 && info.day > 4)
      {safetyArr.push('WEEKEND: Be extra alert. College kids are out!')};


    let notices = safetyArr.map(function(listEl, index){
      return <li key={index}><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{listEl}</li>
    });
    return notices;
  },

  render: function(){
    if(this.props.viewReminders === false){return null}
    else {
    return (<div className="reminder-container">
              <div className="reminder">
              <h1>Remember:<i className="fa fa-cog fa-spin fa-fw"></i></h1>
              <ul>
                {this._createReminder(this.props.rideTime)}
                <li><i className="fa fa-lock fa-lg" aria-hidden="true"></i>ALWAYS: Lock up your bike</li>
                <li><i className="fa fa-glass" aria-hidden="true"></i>ALWAYS: If you've been drinking, CALL A CAB!</li>
                <li><i className="fa fa-ambulance" aria-hidden="true"></i>
                    ACCIDENT? 911, then: <a href={"https://www.bikelaw.com/"}>https://www.bikelaw.com/</a></li>
              </ul>
              <button onClick={(evt) => this._handleClick(evt)} type="click">Go On Your Ride!</button>
              </div>
            </div>
          )
        }
      }
});
