import React, { Component } from "react";
//import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trashLocations: [
        { lat: 35.780313, lng: -78.639144 },
        { lat: 35.769027, lng: -78.722105 },
        { lat: 35.760321, lng: -78.720989 }
      ]
    }
  }

  displayMarkers = () => {
    return this.state.trashLocations.map((location, index) => {
      return <Marker key={index} id={index} position = {{
        lat: location.lat,
        lng: location.lng
      }}
      onClick={() => console.log("Location Clicked")} />
    })
  }

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
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 35.780313, lng: -78.639144 }}
        center={{ lat: 35.780313, lng: -78.639144 }}
      >
        {this.displayMarkers()}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASqfYqXSpj9Hmn3hrPiu8RwOXxxmOhyLE'
})(MapContainer);
