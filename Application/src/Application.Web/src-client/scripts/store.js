export const STORE = {
  _data: {
    currentUser: {},
    currentRoute: '',
    mapHazards: [],
    hazardsToSave: {},
    savedRides: [],
    directionsResult: {}
  },

  getStore: function(){
    return this._data;
  },

  setStore: function(prop, propVal){
    this._data[prop] = propVal;
    // console.log(propVal)
		if(typeof this._callbackFunction === 'function'){
      this._callbackFunction();
    };
  },

  storeChange: function(callback){
    this._callbackFunction = callback;
  }
};
