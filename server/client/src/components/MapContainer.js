import React, { Component } from "react";
//import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trashLocations: [
        { lat: 35.780313, lng: -78.639144, name: "Raleigh" },
        { lat: 35.769027, lng: -78.722105, name: "Walnut Springs Long Bridge" },
        { lat: 35.760321, lng: -78.720989, name: "My hometown" }
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {} 
    }
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.trashLocations.map((location, index) => {
      return <Marker key={index} id={index} name={location.name} position = {{
        lat: location.lat,
        lng: location.lng
        }}
        
        onClick={this.onMarkerClick}>

        </Marker>
    })
  }

  render() {
    console.log(`rendering map container`)
    const mapStyles = {
      width: '70%',
      height: '70%',
      margin: '5% 15%',
      borderRadius: '10px',
    };

    return (
      <div className= "row justify-content-center">
        <Map
          className = "col-md-12"
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 35.780313, lng: -78.639144 }}
          // center={{ lat: 35.780313, lng: -78.639144 }}
        >
          {this.displayMarkers()}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
            </div>
          </InfoWindow>

        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASqfYqXSpj9Hmn3hrPiu8RwOXxxmOhyLE'
})(MapContainer);
