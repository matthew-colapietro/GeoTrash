import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import { customGoogleMapStyle } from '../styling/GoogleMapStyle'

import { getTrashData } from "../actions"  


export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {} 
    };

    this.handleMapClick = this.handleMapClick.bind(this);
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

  componentDidMount() {
    this.props.getTrashData('', '', '');
  }

  displayMarkers = () => {
    return this.props.trash.trashes.map((location, index) => {
      return <Marker key={index} id={index} name={location.reporterName} image={location.trashImage} position = {{
        lat: location.latitude,
        lng: location.longitude
        }}
        
        onClick={this.onMarkerClick}>

        </Marker>
    })
  };

  handleMapClick = (e) => {
    // console.log(latLng.lat())
  }

  render() {
    console.log(`rendering map container`)
    const mapStyles = {
      width: '80%',
      height: '90%',
      margin: '2% 10%',
      borderRadius: '10px',
    };

    //display "loading" text if props does not yet contain data
    if (!this.props.trash.trashes) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div className= "row justify-content-center">
        <Map
          className = "col-md-12"
          google={this.props.google}
          zoom={12}
          style = {mapStyles}
          initialCenter={{ lat: 35.780313, lng: -78.639144 }}
          // center={{ lat: 35.780313, lng: -78.639144 }}
          onClick={this.handleMapClick()}
        >
          {console.log(this.props.trash.trashes)}
          {this.displayMarkers()}

          

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h3>Reporter: {this.state.selectedPlace.name}</h3>
              <img src={this.state.selectedPlace.image} alt="specific trash" />
            </div>
          </InfoWindow>

        </Map>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { trash: state.trash};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ getTrashData }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProp)(GoogleApiWrapper({
  apiKey: 'AIzaSyASqfYqXSpj9Hmn3hrPiu8RwOXxxmOhyLE'
})(MapContainer));
