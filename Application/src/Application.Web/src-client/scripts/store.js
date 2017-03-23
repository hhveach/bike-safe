export const STORE = {
  _data: {
    currentUser: {},
    currentRoute: '',
    mapHazards: [],
    hazardsToSave: {},
    savedRides: [],
    directionsResult: {},
    viewCorners: {}
  },

  getStore: function(){
    return this._data;
  },

  setStore: function(prop, propVal){
    this._data[prop] = propVal;
		if(typeof this._callbackFunction === 'function'){
      this._callbackFunction();
    };
  },

  storeChange: function(callback){
    this._callbackFunction = callback;
  }
};
