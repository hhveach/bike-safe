import React from 'react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const NavComponent = React.createClass({

  getInitialState: function(){
    // ACTIONS.getUser();
    return STORE.getStore();
  },

  _getMenuOptions: function(currentUserOnStore){
    console.log(currentUserOnStore)
    let routeList = []
    if ( typeof currentUserOnStore.id === 'undefined'){
      routeList = [
        {appRouteName: 'home', hashRoute: ''},
        {appRouteName: 'login', hashRoute: 'login'},
        {appRouteName: 'register', hashRoute: 'register'},
      ]
    } else {
      routeList = [
        {appRouteName: 'home', hashRoute: ''},
        {appRouteName: 'profile', hashRoute: 'profile'},
        {appRouteName: 'rides', hashRoute: 'rides'},
        {appRouteName: 'hazards', hashRoute: 'hazards'}
      ]
    }
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
    console.log(this.props.currentUser)
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
// {this.props.hashRoute}
const RouteOption = React.createClass({

  _handleNavClick: function(evt){
    ACTIONS.changeNav(this.props.appRouteName.toLowerCase(), this.props.hashRoute)
  },

  render: function(){
    return (
      <a onClick={this._handleNavClick}>{this.props.appRouteName}</a>
    )
  }
})
