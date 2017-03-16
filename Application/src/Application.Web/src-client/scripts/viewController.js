import React from 'react';
import {HomeView} from './views/home-view.js';
import {LoginView} from './views/login-view.js';
import {RegisterView} from './views/home-view.js';
import {ProfileView} from './views/login-view.js';
import {RemindersView} from './views/home-view.js';
import {RidesView} from './views/login-view.js';
import {HazardsView} from './views/login-view.js';
import {NavComponent} from './components/component-nav.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({
  getInitialState: function(){
    ACTIONS.changeNav(this.props.route, window.location.hash);
    let store = STORE.getStore();
    return store;
  },

  componentDidMount: function(){
    let comp = this;
    STORE.storeChange(function(){
      let newStoreObj = STORE.getStoreData();
      comp.setState(newStoreObj)
    })
  },

  render: function(){
    let renderComponent;

    switch(this.state.currentRoute){
        case 'home':
          renderComponent = <HomeView {...this.state}/>;
          break;
        case 'login':
          renderComponent = <LoginView {...this.state}/>;
          break;
        case 'register':
          renderComponent = <RegisterView {...this.state}/>;
          break;
        case 'profile':
          renderComponent = <ProfileView {...this.state}/>;
          break;
        case 'reminders':
          renderComponent = <RemindersView {...this.state}/>;
          break;
        case 'rides':
          renderComponent = <RidesView {...this.state}/>;
          break;
        case 'hazards':
          renderComponent = <HazardsView {...this.state}/>;
          break;

      default:
    };

<<<<<<< HEAD
    return (  <div>
                <NavComponent/>
=======
    return (  <div className="main-container">
                <NavComponent {...this.state}/>
>>>>>>> 14fbdb0c41ab8797d13598b232d8250ba21fa189
                {renderComponent}
              </div>
           )
  }
});
