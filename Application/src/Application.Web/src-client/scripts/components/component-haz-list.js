import React from 'react';
import {ACTIONS} from '../actions.js';
import {STORE} from '../store.js';
import {getViewCorners} from '../utils/utils-map.js'
import { maps } from '@google/maps';

export const HazListComponent = React.createClass({
  // getDefaultProps: function(){
  //   let map = this.props.mapEl
  //   let cornerCoords = getViewCorners(map)
  //   return ACTIONS.getAllHazards(cornerCoords)
  // },
  // componentWillReceiveProps: function(props){
  //   if (props.mapEl){
  //
  //   }
  // },

  render: function(){
    console.log('from HazListComponent' , this.props.mapHazards)

    return (
      <div>
        <HazItems hazItems={this.props.mapHazards}/>
      </div>
    )
  }

})

const HazItems = React.createClass({
  _handleHazDelete: function(evt){
    ACTIONS.deleteHaz(evt.target.dataset.hazid)
  },

  _createHazardsList: function(haz){
    let comp = this
    console.log('from HazItems' , haz)
    // console.log(this.props.mapEl)
    let hazMap = haz.map( function(listEl, ind){
      return (
              <li key={ind}>
                <p>{listEl.type}</p>
                <i onClick={comp._handleHazDelete} data-hazid={listEl.id} className="fa fa-trash-o" aria-hidden="true"/>
              </li>
      )
    })
    return hazMap

  },

  render: function(){
    return (
          <div className="haz-list">
            <ul>
              {this._createHazardsList(this.props.hazItems)}
            </ul>
          </div>
    )
  }
})
