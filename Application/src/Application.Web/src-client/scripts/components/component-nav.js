import React from 'react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const NavComponent = React.createClass({

  getInitialState: function(){
    return STORE.getStore()
  },

  _getMenuOptions: function(currentUserOnStore){
    // let routeList = []
    // if (typeof currentUserOnStore._id === 'undefined'){
      let routeList = [
        {appRouteName: 'HOME', hashRoute: ''},
        {appRouteName: 'LOGIN', hashRoute: 'login'},
        {appRouteName: 'REGISTER', hashRoute: 'register'},
      ]
    // } else {
      // routeList = [
      //   {appRouteName: 'HOME', hashRoute: ''},
      //   {appRouteName: 'PROFILE', hashRoute: 'profile'},
      //   {appRouteName: 'RIDES', hashRoute: 'rides'},
      //   {appRouteName: 'HAZARDS', hashRoute: 'hazards'}
      // ]
    // }
    return routeList;
  },

  _showNavBarJSX: function(currentNavRoute, currentUser){
    let menuOptions = this._getMenuOptions(currentUser)
    let componentsList = menuOptions.map(function(routeObj, i){
      console.log(componentsList)
      return <RouteOption {...routeObj} key={i} _currentNavRoute={currentNavRoute}/>
    })
    return componentsList
  },

  _showSideNav: function(){
    document.getElementById("side-nav-bar").classList.toggle('show');
  },

  render: function(){
    return (
      <div className="nav-comp">
        <div className="top-nav">
          <i onClick={this._showSideNav} className="fa fa-bars fa-4x drop-btn" aria-hidden="true"></i>
          <div id="side-nav-bar" className="side-nav-content">
          {this._showNavBarJSX(this.props.currentNavRoute, this.props.currentUser)}
          </div>
        </div>
      </div>
    )
  }
})

const RouteOption = React.createClass({

  _handleNavClick: function(evt){
    ACTIONS.changeNav(this.props.appRouteName, this.props.hashRoute)
  },

  render: function(){
    return (
          <a href={this.props.hashRoute} onClick={this._handleNavClick}>{this.props.appRouteName}</a>
    )
  }
})
