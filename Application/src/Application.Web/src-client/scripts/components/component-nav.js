import React from 'react';
import {ACTIONS} from '../actions.js'
import {STORE} from '../store.js'

export const NavComponent = React.createClass({
  getInitialState: function(){
      return {
        animatorAtStart : true
      }
  },

  _handleAnimation: function(){
    let component = this

    setTimeout(function(){
      component.setState({
        animatorAtStart: true
      })
    }, 500)

    this.setState({
      animatorAtStart: false
    })


  },

  _getMenuOptions: function(currentUserOnStore){
    // console.log(currentUserOnStore)
    let routeList = []
    if (typeof currentUserOnStore.id === 'undefined'){
      routeList = [
        {appRouteName: 'login', showText: 'login', hashRoute: 'login'},
        {appRouteName: 'register', showText: 'register', hashRoute: 'register'},
        // {appRouteName: 'map', showText: 'map', hashRoute: 'map'},
      ]
    } if (currentUserOnStore.isAuthenticated === true) {
      routeList = [
        {appRouteName: 'home', showText: 'home', hashRoute: ''},
        {appRouteName: 'profile', showText: 'profile', hashRoute: 'profile'},
        {appRouteName: 'rides', showText: 'rides', hashRoute: 'rides'},
        {appRouteName: 'hazards', showText: 'hazards', hashRoute: 'hazards'},
        {appRouteName: 'login', showText: 'logout', hashRoute: 'login'},
        // {appRouteName: 'map', showText: 'map', hashRoute: 'map'},
        // {appRouteName: 'reminders', showText: 'reminders', hashRoute: 'reminders'}
      ]
    }
    return routeList;
  },

  _showNavBarJSX: function(currentNavRoute, currentUser){
    let menuOptions = this._getMenuOptions(currentUser)
    let component = this
    let componentsList = menuOptions.map(function(routeObj, i){
      return <RouteOption {...routeObj} key={i} currentRoute={currentNavRoute} _animateNav={component._handleAnimation}/>
    })
    return componentsList
  },

  _showSideNav: function(){
    document.getElementById("side-nav-bar").classList.toggle('show');
      window.onclick = function(evt){
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
    // console.log(this.props.currentUser)
    return (
      <div className="nav-comp">
        <div className="top-nav">
          <i onClick={this._showSideNav} className="fa fa-bars fa-4x drop-btn" aria-hidden="true"></i>
          <h1>Bike Safe</h1>
          <div id="side-nav-bar" className="side-nav-content">
          {this._showNavBarJSX(this.props.currentRoute, this.props.currentUser)}
          </div>
        </div>
        <div className={`nav-animator position-${this.state.animatorAtStart ? 'start not-visible' : 'end'}`}>
          <i className="fa fa-bicycle fa-4x" aria-hidden="true"></i>
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
    this.props._animateNav()
  },

  render: function(){
    return (
      <a onClick={this._handleNavClick} data-text={this.props.showText}>{this.props.showText}</a>
    )
  }
})
