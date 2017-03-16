import React from 'react';
import {HomeView} from './views/home-view.js';
import {LoginView} from './views/login-view.js';
import {RegisterView} from './views/home-view.js';
import {ProfileView} from './views/login-view.js';
import {RemindersView} from './views/home-view.js';
import {RidesView} from './views/login-view.js';
import {HazardsView} from './views/login-view.js';
import {NavComponentSide} from './components/component-nav.js';
import {STORE} from './actions.js';
import {ACTIONS} from './store.js';

export const ViewController = React.createClass({
  getInitialState: function(){
    ACTIONS.changeNav(this.props.route, window.location.hash);
    let store = STORE.getStore();
    return store;
  },

  render: function(){
    let renderComponent;

    switch(this.state.currentRoute){
        case '':
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

    return (  <div className="main-container">
                <NavComponentSide/>
                {renderComponent}
              </div>
           )
  }
});
