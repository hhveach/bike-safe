import React from 'react';
import GoogleMapReact from 'google-map-react';

export const BasicMapView = React.createClass({
  getInitialState: function(){
  return  {
          center: {lat: 32.7846418, lng: -79.940918},
          zoom: 14
        };

  },

  // _handleClick: function(evt){
  //   let marker = new google.maps.Marker({
  //   position: ,
  //   title:"Hello World!"
  //   });
  // },

  render: function() {

    return (<div className="first-map">
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        bootstrapURLKeys={{key: 'AIzaSyBGmL06icW_4nOifeu4rxUuEuFzOj2HBjY'}}
        layerTypes={['TrafficLayer', 'TransitLayer']}
        // onClick={this._handleClick}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        /> */}
      </GoogleMapReact>
      </div>
    );
  }
});
