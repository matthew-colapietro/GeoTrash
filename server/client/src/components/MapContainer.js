import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
// import { customGoogleMapStyle } from '../styling/GoogleMapStyle'
import GeoTrashIcon from "../assets/geoTrash-icon.png"
import RedGeoTrashIcon from "../assets/geoTrash-icon-red.png"

import { getTrashData, setCoordinates } from "../actions"  


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
    this.props.getTrashData('', '', '', '');
  }

  displayMarkers = () => {
    
    return this.props.trash.trashes.map((location, index) => {
      //checking status of location to determine what logo image should be displayed
      const markerCheck = () => {
        if (location.status === "Open") {
          return {
            url: RedGeoTrashIcon,
            scaledSize: new this.props.google.maps.Size(40, 40),
          } 
        } else {
          return {
            url: GeoTrashIcon,
            scaledSize: new this.props.google.maps.Size(40, 40),
          }
        }
      }
      
      return <Marker 
          icon = {markerCheck()}
          key={index} 
          id={location._id}
          name={location.reporterName} 
          image={location.trashImage} 
          status={location.status} 
          position = {{
            lat: location.latitude,
            lng: location.longitude
             }}
          onClick={this.onMarkerClick}>
        </Marker>
    })
  };

  handleMapClick = (ref, map, ev) => {
    //creating variables for lat/long data
    const clickedLatitude = ev.latLng.lat();
    const clickedLongitude = ev.latLng.lng();
    
    //updating state when map is clicked
    this.setState({
      userClickedLatitude: clickedLatitude,
      userClickedLongitude: clickedLongitude
    })

    this.props.setCoordinates(clickedLatitude, clickedLongitude)
  };

  render() {
    //Styling for google map
    const mapStyles = {
      width: '80%',
      height: '90%',
      margin: '2% 10%',
      borderRadius: '10px',
      position: 'absolute',
    };

    //display "loading" text if props does not yet contain data
    if (!this.props.trash.trashes) {
      return (
        <h1 className = "row justify-content-center">Loading...</h1>
      )
    }

    return (
      <div style={{backgroundColor: "#f5f5f5"}}>

        <div className= "row justify-content-center">
          <Map
            className = "col-md-12 mb-4"
            google={this.props.google}
            zoom={5}
            style = {mapStyles}
            initialCenter={{ lat: 35.780313, lng: -78.639144 }}
            // center={{ lat: 35.780313, lng: -78.639144 }}
            onClick={this.handleMapClick}
          >
            
            {/*function to display all locations in the database as a marker on map */}
            {this.displayMarkers()}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
              maxWidth='300'
            >
              <div style={{height: '300px'}}>
                <h5 className="h-10">Reporter: {this.state.selectedPlace.name}</h5>
                <p className="h-10"><strong>Status:</strong> {this.state.selectedPlace.status}</p>
                <img className="h-75" src={this.state.selectedPlace.image} alt="specific trash" />
              </div>
            </InfoWindow>

          </Map>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { trash: state.trash };
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ getTrashData, setCoordinates }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(GoogleApiWrapper({
  apiKey: 'AIzaSyASqfYqXSpj9Hmn3hrPiu8RwOXxxmOhyLE'
})(MapContainer));
