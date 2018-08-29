import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import {ViewController} from './viewController.js';

if(window.location.hostname === 'localhost'){
    let headEl = document.querySelector('head')
    let linkEl = document.querySelector('link[href="./css/styles.css"]')
    headEl.removeChild(linkEl)
}


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start()
    },

    	routes: {
    	'login' : 'showLoginComponent',
    	'register' : 'showRegisterComponent',
    	'profile' : 'showProfileComponent',
    	'hazards' : 'showHazardsComponent',
    	'hazards/:id' : 'showHazardsComponent',
    	'rides' : 'showRidesComponent',
    	'rides/:id' : 'showRidesComponent',
    	'' : 'showHomePageComponent',
      'map' : 'showMapForPractice'
    },

    showMapForPractice: () => {
      ReactDOM.render(<ViewController route={'map'}/>, document.querySelector('#app-container'))
    },

    showHomePageComponent: () => {
      ReactDOM.render(<ViewController route={'home'}/>, document.querySelector('#app-container'));
    },

    showLoginComponent: () => {
      ReactDOM.render(<ViewController route={'login'}/>, document.querySelector('#app-container'));
    },

    showRegisterComponent: () => {
      ReactDOM.render(<ViewController route={'register'}/>, document.querySelector('#app-container'));
    },

    showProfileComponent: () => {
      ReactDOM.render(<ViewController route={'profile'}/>, document.querySelector('#app-container'));
    },

    showRidesComponent: () => {
      ReactDOM.render(<ViewController route={'rides'}/>, document.querySelector('#app-container'));
    },

    showHazardsComponent: () => {
      ReactDOM.render(<ViewController route={'hazards'}/>, document.querySelector('#app-container'));
    }
});

const SickApp = new AppRouter();
