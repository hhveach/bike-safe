import React from 'react';

export const HomeView = React.createClass({
  render: function(){
    return(
    <div className="home-view-container">
      <h1>Ride It Out</h1>
      <div className="ride-start-form">
        <form>
          <input type="text" placeholder="origin address"></input>
          <input type="text" placeholder="destination address"></input>
          <button type="onSubmit">Ride!</button>
        </form>
      </div>
    </div>
  )
  }
})
