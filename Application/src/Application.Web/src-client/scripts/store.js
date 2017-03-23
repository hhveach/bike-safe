export const STORE = {
  _data: {
    currentUser: {},
    currentRoute: '',
    mapHazards: [],
    hazardsToSave: {},
    savedRides: [],
<<<<<<< HEAD
    directionsResult: {},
    viewCorners: {}
=======
    mapEl: {}
    // directionsResult: {}
    // duration: '',
    // distance: ''
>>>>>>> 5774cc40428ba76ddee645784331c1edae72289f
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
