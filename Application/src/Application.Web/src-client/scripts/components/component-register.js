import React from 'react'

export const RegisterComponent = React.createClass({

  _handleSubmit: function(evt){
    // let current = evt.target;
    //
    // let registerObj = {
    //   // current.name.value;
    //   current.username.value;
    //   current.password.value;
    //   // current.profileImage.value;
    //   // current.bikeName.value;
    // },
  },

  render: function(){
    return (
      <div className="input-form">
        <form onSubmit={this._handleSubmit}>
          {/* <input type="text" name="name" placeholder="Full Name *"></input> */}
          <input type="text" name="username" placeholder="Username *"></input>
          <input type="text" name="password" placeholder="Password *"></input>
          {/* <input type="text" placeholder="Confirm Password"></input> */}
          {/* <input type="text" name="profileImage" placeholder="Profile Image"></input>
          <input type="text" name="bikeName" placeholder="Your Bike"></input> */}
          <button>Ride!</button>
        </form>
      </div>
    )
  }
});
