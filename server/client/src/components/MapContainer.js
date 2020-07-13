import React, { Component } from "react";
//import { connect } from "react-redux";
import { Map, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {

  render() {
    console.log(`rendering map container`)
    console.log(this.props.latitude, this.props.longitude)
    const mapStyles = {
      width: '70%',
      height: '70%',
      margin: '150px 15%',
      borderRadius: '10px',
    };

    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        center={{ lat: 47.444, lng: -122.176 }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASqfYqXSpj9Hmn3hrPiu8RwOXxxmOhyLE'
})(MapContainer);