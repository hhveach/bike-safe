import Backbone from 'backbone';
import ReactDOM from 'react-dom';
import React from 'react';
import {ACTIONS} from './actions.js';

const STORE = {
  _mainData: {
    currentUser: '',
    mapMarkers: [],
  }

  getStore: function(){
    return this._mainData;
  },

  setStore: function(){

  },


};
