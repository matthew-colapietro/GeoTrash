import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTrashData } from "../actions" ; 
import { Link } from "react-router-dom";
import MapContainer  from "./MapContainer";
import Footer from "./Footer"
import Moment from 'react-moment'

import 'bootstrap/dist/css/bootstrap.css';
import '../styling/AdminPage.css';


class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      reporterName: '',
      trashQuantity: '',
      hazardnessLevel: '',
      status: '',
      test: '',
    }

    this.displayTable = this.displayTable.bind(this);
    this.handleToggleStatusClick = this.handleToggleStatusClick.bind(this);

  }

  componentDidMount() {
    this.props.getTrashData('','','');
  }

  componentDidUpdate (prevProps, prevState) {
    //first ensure componentDidUpdate is not checking updating on first API pull
    if (!prevProps.trash) {
      console.log('first update')
      //checking state to see if any changes have been made
      //based on changes to the form in the render function
    } else if (prevState.reporterName !== this.state.reporterName || prevState.trashQuantity !== this.state.trashQuantity || 
              prevState.hazardnessLevel !== this.state.hazardnessLevel || prevState.status !== this.state.status){
      console.log(this.state)
      this.props.getTrashData(this.state.hazardnessLevel, this.state.trashQuantity, this.state.reporterName, this.state.status);
    }
  }

  handleToggleStatusClick = (e) =>  {
    console.log(`handledclicked ${e}`)
    
  }

  displayTable() {
    return this.props.trash.trashes.map((location, index) => {
      return (
        <tr>
          <td><button id={location._id} onClick={e => this.handleToggleStatusClick(e.target.getAttribute('id'))}>Toggle Status</button></td>
          <td>{location.status}</td>
          {/* Using moment.js to convert UTC date to readable format */}
          <td><Moment format="YYYY/MM/DD">
              {location.submissionDate}
            </Moment></td>
          <td>{location.reporterName}</td>
          <td>{location.trashQuantity}</td>
          <td>{location.hazardnessLevel}</td>
          <td>{location.latitude}</td>
          <td>{location.longitude}</td>
        </tr>
      )
    })
  }

  render() {
    //display "loading" text if props does not yet contain data
    if (!this.props.trash.trashes) {
      return (
        <h1>Loading...</h1>
      )
    }
    
    return (
      <div>
        <Header />

        <div>
          <Link to="/">
            <button className="back-button text-center">Back</button>
          </Link>
        </div>
        

        <div className="row justify-content-sm-center py-2">
          {/* <form> */}

            <div className="col-md-6">
            {/* user's search bar entry will be stored in state */}
            <div>
              <label className="mr-2">Search By User Name</label>
              <input className="mr-4" type="search" onChange={event => this.setState({ reporterName: event.target.value }) }></input>
            </div>

            {/* category selection changes will be stored in state */}
            <div>
              <label className="mr-2">Filter by: Trash Quantity</label>
              <select className="mr-4" name="quantity" onChange={event => this.setState({ trashQuantity: event.target.value }) }>
                <option value=""></option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
            </div>


            {/* category selection changes will be stored in state */}
            <div className="col-md-6">
            <div>
              <label className="mr-2">Trash Hazard Level</label>
              <select className="mr-4" name="hazard" onChange={event => this.setState({ hazardnessLevel: event.target.value }) }>
                <option value=""></option>
                <option value="Minimal">Minimal</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

            {/* sort selection change will be changed in state */}
            <div>
              <label className="mr-2">Status:</label>
              <select className="mr-4" name="status" onChange={event => this.setState({ status: event.target.value }) }>
                <option value=""></option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            </div>
       

          {/* </form> */}
        </div>

        <div className="table-container">
          <table className="table table-dark table-striped justify-content-center">
            <thead>
              <tr>
                <th scope="col">Change Status</th>
                <th scope="col">Status</th>
                <th scope="col">Date Submitted</th>
                <th scope="col">Reporter Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Hazard Level</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
              </tr>
            </thead>
            <tbody>
              
              {this.displayTable()}

            </tbody>
          </table>
        </div>

        <MapContainer />
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProp)(AdminPage);