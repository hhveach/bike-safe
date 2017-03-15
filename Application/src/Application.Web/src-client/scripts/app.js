import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import {HomeView} from './views/home-view.js';
import {LoginView} from './views/login-view.js';
import GoogleMapReact from 'google-map-react';
import {BasicMap} from './maps-try.js';


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start()
    },

    	routes: {
    	'login' : 'showLoginComponent',
    	'register' : 'showRegisterComponent',
    	'logout' : 'showLogoutComponent',
    	'profile' : 'showProfileComponent',
    	'reminders' : 'showRemindersComponent',
    	'hazards' : 'showHazardsComponent',
    	'hazards/:id' : 'showHazardsComponent',
    	'rides' : 'showRidesComponent',
    	'rides/:id' : 'showRidesComponent',
    	'' : 'showHomePageComponent'
    },

    showHomePageComponent: function(){
      ReactDOM.render(
        <HomeView/>, document.querySelector('#app-container')
      )
    },

    showLoginComponent: function(){
    ReactDOM.render(
      <LoginView/>, document.querySelector('#app-container')
    )
    },
})
new AppRouter()
