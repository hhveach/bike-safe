import React from 'react';

export const NavComponentSide = React.createClass({
  render: function(){
    return (
      <div className="side-nav-bar">
        <a href>Log In</a>
        <a href>Register</a>
        <a href>Profile</a>
        <a href>Log Out</a>
        <a href>Hazards</a>
        <a href>Your Rides</a>
      </div>
    )
  }

})

export const NavBurger = React.createClass({
  render: function(){
    return (
    <div className="top-nav">
      <i className="fa fa-bars fa-4x" aria-hidden="true"></i>
    </div>
  )
  }
})
