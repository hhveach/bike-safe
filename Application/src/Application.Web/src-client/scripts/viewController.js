import React from 'react';
import {HomeView} from './views/home-view.js';
import {LoginView} from './views/login-view.js';
import {RegisterView} from './views/register-view.js';
import {ProfileView} from './views/profile-view.js';
import {RemindersView} from './views/reminders-view.js';
import {RidesView} from './views/rides-view.js';
import {HazardsView} from './views/hazards-view.js';
import {NavComponent} from './components/component-nav.js';
import {DirectionsView} from './views/directions-view.js';
import {STORE} from './store.js';
import {ACTIONS} from './actions.js';

export const ViewController = React.createClass({

  getInitialState: function(){
    ACTIONS.changeNav(this.props.route, window.location.hash);
    return STORE.getStore();
  },

  componentDidMount: function(){
    let comp = this;
    STORE.storeChange(function(){
      let newStoreObj = STORE.getStore();
      comp.setState(newStoreObj);
    });
    // ACTIONS.getAllHazards(this.state.viewCorners)
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
        case 'map':
          renderComponent = <DirectionsView {...this.state}/>;
          break;

      default:
    };
    return (  <div className="main-container">
                <NavComponent {...this.state}/>
                {renderComponent}
              </div>
           )
  }
});
