import React from 'react';

export const ProfileComponent = React.createClass({

  _handleProfileBuild: (userObject) => {
    const { image, name } = userObject;
    const { mapHazards, savedRides } = this.props;
    // if(image === null){
    //   image = `http://flathash.com/${name}`;
    // };

      return (  <div className="profile">
                  <div className="profile-img">
                    <h1><i className="fa fa-user-circle" aria-hidden="true"></i> {name}</h1>
                    <img src={"http://d4nuk0dd6nrma.cloudfront.net/wp-content/uploads/2014/06/Hinault4.jpg"}/>
                  </div>
                  <div className="profile-info">
                    <h1><i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    Hazards Identified: {mapHazards.length}
                   </h1>
                    <h1><i className="fa fa-bicycle" aria-hidden="true"></i>
                     My Rides: {savedRides.length}
                   </h1>
                  </div>
                </div>
      )
  },

  render: () => {
    const { currentUser } = this.props;
    return (
    <div className="profile-container">
        {this._handleProfileBuild(currentUser)}
    </div>
    )
  }
});
