// import React from 'react';
// import {ACTIONS} from '../actions.js';
//
// export const DirFormComponent = React.createClass({
//
//   componentWillUpdate: function(){
//     let oldRide = this.props.inputRide;
//
//     if(oldRide.origin !== undefined && oldRide.destination !== undefined){
//       this.refs.search.value = oldRide.origin;
//       this.refs.searchTwo.value = oldRide.destination;
//       }
//   },
// 
//   componentWillReceiveProps: function(props){
//     let saved = props.inputRide.origin;
//     if(props.currentLocation && saved === undefined){
//       this.refs.search.value = props.currentLocation;
//     }
//   },
//
//   _handleSubmit: function(evt){
//     evt.preventDefault();
//        let directionsRequest = {
//          origin: evt.target.origin.value,
//          destination: evt.target.dest.value,
//          travelMode: 'BICYCLING',
//          provideRouteAlternatives: true
//       };
//     ACTIONS.goToReminders();
//     ACTIONS.getDirections(this.props.mapEl, directionsRequest);
//     ACTIONS.getTime();
//   },
//
//   _handleSave: function(evt){
//     let rideObj = {
//       name: this.refs.rideName.value,
//       source: this.refs.search.value,
//       destination: this.refs.searchTwo.value
//     };
//     ACTIONS.saveRide(rideObj);
//   },
//
//   _handleAuto: function(event, mapObj){
//     ACTIONS.autoType(this.props.mapEl, this.refs.search, this.refs.searchTwo)
//   },
//
//   render: function(){
//     return (
//       <div className="input-form">
//         <form onSubmit={this._handleSubmit}>
//           <input onClick={(evt) => this._handleAuto(evt, this.props.mapEl)}
//                  ref="search" type="text" placeholder="origin address" name="origin"></input>
//           <input onClick={(evt) => this._handleAuto(evt, this.props.mapEl)}
//                  ref="searchTwo" type="text" placeholder="destination address" name="dest"></input>
//           <input ref="rideName" type="text" placeholder="ride description" name="desc"></input>
//           <button className="dir-btn" type="submit">Ride!</button>
//         </form>
//         <button className="dir-btn" type="click" onClick={this._handleSave}>Save This Ride?</button>
//       </div>
//     )
//   }
// })
