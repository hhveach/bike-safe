import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import {BasicMap} from './maps-try.js';
import {ViewController} from './viewController.js';


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start()
    },

    	routes: {
    	'login' : 'showLoginComponent',
    	'register' : 'showRegisterComponent',
    	'profile' : 'showProfileComponent',
    	'reminders' : 'showRemindersComponent',
    	'hazards' : 'showHazardsComponent',
    	'hazards/:id' : 'showHazardsComponent',
    	'rides' : 'showRidesComponent',
    	'rides/:id' : 'showRidesComponent',
    	'' : 'showHomePageComponent'
    },

    showHomePageComponent: function(){
      ReactDOM.render(<ViewController route={'home'}/>, document.querySelector('#app-container'));
    },

    showLoginComponent: function(){
      ReactDOM.render(<ViewController route={'login'}/>, document.querySelector('#app-container'));
    },

    showRegisterComponent: function(){
      ReactDOM.render(<ViewController route={'register'}/>, document.querySelector('#app-container'));
    },

    showRemindersComponent: function(){
      ReactDOM.render(<ViewController route={'reminders'}/>, document.querySelector('#app-container'));
    },

    showProfileComponent: function(){
      ReactDOM.render(<ViewController route={'profile'}/>, document.querySelector('#app-container'));
    },

    showRidesComponent: function(){
      ReactDOM.render(<ViewController route={'rides'}/>, document.querySelector('#app-container'));
    },

    showHazardsComponent: function(){
      ReactDOM.render(<ViewController route={'hazards'}/>, document.querySelector('#app-container'));
    }
});

const SickApp = new AppRouter();
