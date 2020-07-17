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
      selectedPlace: {},
      userClickedLatitude: null,
      userClickedLongitude: null,
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

  handleMapClick = (ref, map, ev) => {
    const clickedLatitude = ev.latLng.lat();
    const clickedLongitude = ev.latLng.lng();
    
    this.setState({
      userClickedLatitude: clickedLatitude,
      userClickedLongitude: clickedLongitude
    })
    
  };

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
      <div>
        <div className="row justify-content-center">
          <p>Click on map to find the Latitude and Longitude of your location</p>
        </div>
        <div className="row justify-content-center">
          <h5> Latitude: {this.state.userClickedLatitude} </h5>
        </div>
        <div className="row justify-content-center">
          <h5> Longitude: {this.state.userClickedLongitude} </h5>
        </div>

        <div className= "row justify-content-center">
          <Map
            className = "col-md-12"
            google={this.props.google}
            zoom={10}
            style = {mapStyles}
            initialCenter={{ lat: 35.780313, lng: -78.639144 }}
            // center={{ lat: 35.780313, lng: -78.639144 }}
            onClick={this.handleMapClick}
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
