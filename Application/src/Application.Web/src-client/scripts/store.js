export const STORE = {
  _data: {
    currentUser: {},
    currentRoute: '',
    mapHazards: [],
    hazardsToSave: {},
    savedRides: []
  },

  getStore: function(){
    console.log(this._data)
    return this._data;
  },

  setStore: function(prop, propVal){
    console.log('firingffff')
    this._data[prop] = propVal;
    console.log(propVal)
		if(typeof this._callbackFunction === 'function'){
      console.log('in this iff')
      this._callbackFunction();
    };
  },

  storeChange: function(callback){
    this._callbackFunction = callback;
  }
};
