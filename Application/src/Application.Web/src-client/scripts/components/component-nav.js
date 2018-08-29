import React from 'react';
import {ACTIONS} from '../actions.js';

export const NavComponent = React.createClass({
  getInitialState: () => {
      return {
        animatorAtStart : true
      }
  },

  _handleAnimation: () => {

    setTimeout(() => {
      this.setState({
        animatorAtStart: true
      })
    }, 500);

    this.setState({
      animatorAtStart: false
    })


  },

  _getMenuOptions: (currentUserOnStore) => {
    const routeList = [];
    if (typeof currentUserOnStore.id === 'undefined'){
      routeList = [
        {appRouteName: 'login', showText: 'login', hashRoute: 'login'},
        {appRouteName: 'register', showText: 'register', hashRoute: 'register'},
        // {appRouteName: 'map', showText: 'map', hashRoute: 'map'},
      ];
    } if (currentUserOnStore.isAuthenticated) {
      routeList = [
        {appRouteName: 'home', showText: 'home', hashRoute: ''},
        {appRouteName: 'profile', showText: 'profile', hashRoute: 'profile'},
        {appRouteName: 'rides', showText: 'rides', hashRoute: 'rides'},
        {appRouteName: 'hazards', showText: 'hazards', hashRoute: 'hazards'},
        {appRouteName: 'login', showText: 'logout', hashRoute: 'login'},
        // {appRouteName: 'map', showText: 'map', hashRoute: 'map'},
        // {appRouteName: 'reminders', showText: 'reminders', hashRoute: 'reminders'}
      ];
    };
    return routeList;
  },

  _showNavBarJSX: (currentNavRoute, currentUser) => {
    const menuOptions = this._getMenuOptions(currentUser);
    let componentsList = menuOptions.map((routeObj, i) => 
      <RouteOption {...routeObj} key={i} currentRoute={currentNavRoute} _animateNav={this._handleAnimation}/>
    );
    return componentsList;
  },

  _showSideNav: () => {
    document.getElementById("side-nav-bar").classList.toggle('show');
      window.onclick = (evt) => {
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
    };
  },

  render: () => {
    const { currentRoute, currentUser } = this.props;
    const { animatorAtStart } = this.state;
    return (
      <div className="nav-comp">
        <div className="top-nav">
          <i onClick={this._showSideNav} className="fa fa-bars fa-4x drop-btn" aria-hidden="true"></i>
          <h1>Bike Safe</h1>
          <div id="side-nav-bar" className="side-nav-content">
          {this._showNavBarJSX(currentRoute, currentUser)}
          </div>
        </div>
        <div className={`nav-animator position-${animatorAtStart ? 'start not-visible' : 'end'}`}>
          <i className="fa fa-bicycle fa-4x" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
})

const RouteOption = React.createClass({

  _handleNavClick: (evt) => {
    const current = evt.target.dataset.text;
    const { appRouteName, hashRoute, _animateNav } = this.props;
    if(current === 'logout'){
      ACTIONS.userLogout();
    }
    else {
      ACTIONS.changeNav(appRouteName, hashRoute);
    };
    _animateNav();
  },

  render: () => {
    const { showText } = this.props;
    return (
      <a onClick={this._handleNavClick} data-text={showText}>{showText}</a>
    )
  }
})
