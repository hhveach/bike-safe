import React from 'react';

export const NavComponent = React.createClass({
  render: function(){
    return (
      <div className="top-nav">
        <i className="fa fa-bars fa-4x drop-btn" aria-hidden="true"></i>
        <div id="side-nav-bar" className="side-nav-content">
          <a href>Log In</a>
          <a href>Register</a>
          <a href>Profile</a>
          <a href>Hazards</a>
          <a href>Your Rides</a>
        </div>
      </div>
    )
  }
})
