import React, { Component } from "react";
import Header from "./Header"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTrashData } from "../actions"  
import { Link } from "react-router-dom";
import MapContainer  from "./MapContainer";

import 'bootstrap/dist/css/bootstrap.css';


class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      reporterName: '',
      trashQuantity: '',
      hazardnessLevel: '',
    }

    this.displayTable = this.displayTable.bind(this);
  }

  componentDidMount() {
    this.props.getTrashData('','');
  }

  componentDidUpdate (prevProps, prevState) {
    //first ensure componentDidUpdate is not checking updating on first API pull
    if (!prevProps.trash) {
      console.log('first update')
      //checking state to see if any changes have been made
      //based on changes to the form in the render function
    } else if (prevState.reporterName !== this.state.reporterName || prevState.trashQuantity !== this.state.trashQuantity || 
              prevState.hazardnessLevel !== this.state.hazardnessLevel){
      console.log(this.state)
      this.props.getTrashData(this.state.hazardnessLevel, this.state.trashQuantity);
    }
  }

  displayTable() {
    return this.props.trash.trashes.map((location, index) => {
      return (
        <tr>
          <th>{index + 1}</th>
          <td>{location.reporterName}</td>
          <td>{location.email}</td>
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
        {console.log(this.props.trash.trashes)}

        <Link to="/">
          <p>Back</p>
        </Link>

        <div className="row justify-content-md-center py-2">
          <form>

            {/* user's search bar entry will be stored in state */}
            <label className="mr-2">Search By User Name</label>
            <input className="mr-4" type="search" onChange={event => this.setState({ query: event.target.value }) }></input>
            
            {/* category selection changes will be stored in state */}
            <label className="mr-2">Filter by Trash Quantity</label>
            <select className="mr-4" name="category" onChange={event => this.setState({ trashQuantity: event.target.value }) }>
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Severe">Severe</option>
            </select>

            {/* category selection changes will be stored in state */}
            <label className="mr-2">Filter by Trash Hazard Level</label>
            <select className="mr-4" name="category" onChange={event => this.setState({ hazardnessLevel: event.target.value }) }>
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Severe">Severe</option>
            </select>

            {/* sort selection change will be changed in state */}
            <label className="mr-2">sort by:</label>
            <select className="mr-4" id="cars" name="cars" onChange={event => this.setState({ sort: event.target.value }) }>
              <option value="highest">highest</option>
              <option value="lowest">lowest</option>
            </select>

          </form>
        </div>

        <div>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">ID #</th>
                <th scope="col">Reporter Name</th>
                <th scope="col">Email</th>
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

        {/* <MapContainer /> */}

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