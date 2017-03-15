import React from 'react'

export const FormComponent = React.createClass({

  render: function(){
    return (
      <div className="input-form">
        <form>
          <input type="text" placeholder="origin address"></input>
          <input type="text" placeholder="destination address"></input>
          <button type="onSubmit">Ride!</button>
        </form>
      </div>
    )
  }

})
