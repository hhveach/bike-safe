import React from 'react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';

export const RideComponent = React.createClass({

  getDefaultProps: function(){
    return ACTIONS.getAllSavedRides();
  },

  // _createRidesList: function(ridesArr){
  //   let mapIt = ridesArr.map(function(listEl, i){
  //     return <BuildRidesList {...listEl} key={i}/>
  //   });
  //   return mapIt;
  // },

  // remove: function(rideList, index){
  //   //rideList = this.props.savedRides;
  //   let deleteRide = rideList.filter(function(listEl, ind){
  //     return index !== ind;
  //   });
  //   STORE.setStore('savedRides', deleteRide);
  // },

  render: function(){
    return (
            <div className="rides-list">
              {/* <ul> */}
              {/* {this._createRidesList(this.props.savedRides)} */}
              <BuildRidesList rides={this.props.savedRides}/>
              {/* </ul> */}
            </div>
    )
  }
});

const BuildRidesList = React.createClass({

  _createRidesList: function(ridesArr){
    let comp = this;
    let mapIt = ridesArr.map(function(listEl, index){
      return (<li key={index}>
              <p onClick={(evt) => comp._handleClick(evt, listEl.source, listEl.destination)}>{listEl.source}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                 {listEl.destination}
              </p>
              <i onClick={(evt) => comp._handleDelete(evt, listEl.id, comp.props.rides)}
                 className="fa fa-trash-o" aria-hidden="true"></i>
            </li>
          )
    });
    return mapIt;
  },

  _handleClick: function(evt, org, dest){
    ACTIONS.goToRide(org, dest);
  },

  _handleDelete: function(evt, id, rideList){
    // console.log(ind)
    ACTIONS.deleteRide(id);
      // let deleteRide = rideList.filter(function(listEl, index){
      //   return ind !== index;
      // });
      // STORE.setStore('savedRides', deleteRide);
  },

  render: function(){
    return (<ul>
              {this._createRidesList(this.props.rides)}
            </ul>
    )
  }
});
