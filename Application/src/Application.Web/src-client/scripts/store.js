export const STORE = {
  _data: {
    currentUser: {},
    currentRoute: '',
    mapHazards: [],
    hazardsToSave: {},
    savedRides: [],
    directionsResult: {},
    viewCorners: {},
    mapEl: {},
    // directionsResult: {}
    // duration: '',
    // distance: ''
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
    if(typeof callback !== 'function'){
    	throw new Error('must have a callback function')
    	}

    if(typeof this._callbackFunction === 'function'){
    	throw new Error('already fired')
    	}

    this._callbackFunction = callback;
  }
};
