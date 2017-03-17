import React from 'react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const NavComponent = React.createClass({

  _getMenuOptions: function(currentUserOnStore){
    console.log(currentUserOnStore)
    let routeList = []
    if (typeof currentUserOnStore.id === 'undefined'){
      routeList = [
        {appRouteName: 'home', showText: 'home', hashRoute: ''},
        {appRouteName: 'login', showText: 'login', hashRoute: 'login'},
        {appRouteName: 'register', showText: 'register', hashRoute: 'register'},
      ]
    } if (currentUserOnStore.isAuthenticated === true) {
      routeList = [
        {appRouteName: 'home', showText: 'home', hashRoute: ''},
        {appRouteName: 'profile', showText: 'profile', hashRoute: 'profile'},
        {appRouteName: 'rides', showText: 'rides', hashRoute: 'rides'},
        {appRouteName: 'hazards', showText: 'hazards', hashRoute: 'hazards'},
        {appRouteName: 'login', showText: 'logout', hashRoute: 'login'}
      ]
    }
    return routeList;
  },

  _showNavBarJSX: function(currentNavRoute, currentUser){
    let menuOptions = this._getMenuOptions(currentUser)
    let componentsList = menuOptions.map(function(routeObj, i){
      return <RouteOption {...routeObj} key={i} currentRoute={currentNavRoute}/>
    })
    return componentsList
  },

  _showSideNav: function(){
    document.getElementById("side-nav-bar").classList.toggle('show');
      window.onclick = function(evt){
        console.log(evt.target)
        if(!evt.target.matches('.drop-btn')) {
          let dropsdown = document.getElementsByClassName('side-nav-content');
          let i;
          for (i=0; i < dropsdown.length; i++){
            let openDropDown = dropsdown[i]
            if(openDropDown.classList.contains('show')){
            openDropDown.classList.remove('show')
          }
        }
      }
    }
  },

  render: function(){
    console.log(this.props.currentUser)
    return (
      <div className="nav-comp">
        <div className="top-nav">
          <i onClick={this._showSideNav} className="fa fa-bars fa-4x drop-btn" aria-hidden="true"></i>
          <div id="side-nav-bar" className="side-nav-content">
          {this._showNavBarJSX(this.props.currentRoute, this.props.currentUser)}
          </div>
        </div>
      </div>
    )
  }
})

const RouteOption = React.createClass({

  _handleNavClick: function(evt){
    let current = evt.target.dataset.text;
    if(current === 'logout'){
      ACTIONS.userLogout();
    }
    else {
      ACTIONS.changeNav(this.props.appRouteName, this.props.hashRoute);
    }
  },

  render: function(){
    return (
      <a onClick={this._handleNavClick} data-text={this.props.showText}>{this.props.showText}</a>
    )
  }
})
