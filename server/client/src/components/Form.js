import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/Form.css'

import { addTrashInformation, setCoordinates, getTrashData } from "../actions"


class Form extends Component {
  constructor() {
    super();

    this.state = {
      reporterName: '',
      phoneNumber: null,
      email: '',
      trashImage: '',
      trashQuantity: '',
      hazardnessLevel: '',
      formView: 'row d-none'
    }

    this.handleSubmitNewTrash = this.handleSubmitNewTrash.bind(this);
    this.updateLat = this.updateLat.bind(this);
    this.updateLng = this.updateLng.bind(this);
    this.handleFormWindowClick = this.handleFormWindowClick.bind(this);
  }

  updateLat () {
    if (!this.props) {
      return null
    } else {
      return this.props.coordinates.latitude
    }
  }

  updateLng() {
    if (!this.props) {
      return null
    } else {
      return this.props.coordinates.longitude
    }
  }

  handleFormWindowClick () {
    if (this.state.formView === "row") {
      this.setState({ formView: "row d-none" })
    } else {
      this.setState({ formView: "row" })
    }  
  }

  handleSubmitNewTrash () {

    let lat = this.updateLat()
    let lng = this.updateLng()

    if (lat === null || lng === null) {
      return alert('Please click on the map to update where the trash will be located (This will fill in the Latitude & Longitude fields)');
    }
    
    if(!this.state.reporterName || !this.state.phoneNumber || !this.state.email || !this.state.trashImage || !this.state.trashQuantity || !this.state.hazardnessLevel) {
      alert('Please ensure all fields are entered');
      console.log(this.props.coordinates)
      return console.log(this.state)

    } else {
      
      const handleRequests = async () => {
        await this.props.addTrashInformation(this.state.reporterName, this.state.phoneNumber, this.state.email, this.state.trashImage, this.state.trashQuantity, this.state.hazardnessLevel, this.updateLat(), this.updateLng(), this.getDate())
        this.props.getTrashData('','','','')
      }
      
      handleRequests()  
    }

    
  }

  getDate() {
    //getting current date and adding to state for submission to database
    let currentDate = new Date()
    return currentDate
  }

  render() {
    return (
      <div>
        <div className="main-form row">
          <div className="col-md-12" id="form-input">
            
            <div className="page-header text-center mt-5">
              <button className="form-button pb-3" onClick={e => this.handleFormWindowClick()}>Submit New Trash Location</button>
            </div>
            
            {/* form to hold the values the user will submit to add a new contact */}
            <form className={this.state.formView}>
              <div className="col-md-5 offset-md-1 pt-4">
                {/* <label><strong>Reporter name</strong></label> */}
                {/* updating the state with the value of the input */}
                <input type='text' className='form-control' placeholder="Reporter Name" onChange={event => this.setState({ reporterName: event.target.value })
                }/>

                <br/>

                {/* <label><strong>Contact Number</strong></label> */}
                {/* changing the phone number input to an integer to add to the state */}
                <input type='text' className='form-control' placeholder="Contact Number" onChange={event => this.setState({ phoneNumber: parseInt(event.target.value, 10) })
                }/>

                <br/>

                {/* <label><strong>Contact Email</strong></label> */}
                {/* updating the state with the value of the input */}
                <input type='text' className='form-control' placeholder="Email" onChange={event => this.setState({ email: event.target.value })
                }/>

                <br/>

                {/* <label><strong>Image of Trash</strong></label> */}
                {/* updating the state with the value of the input */}
                <input type='text' className='form-control' placeholder="Image of Trash" onChange={event => this.setState({ trashImage: event.target.value })
                }/>
              </div>

              <br/>
              
              <div className="col-md-5 pl-2 pt-4">

                {/* <label><strong>Quantity of Trash</strong></label> */}
                {/* updating the state with the value of the input */}
                <select type='text' className='form-control' placeholder="Quantity of Trash" onChange={event => this.setState({ trashQuantity: event.target.value })}>
                  <option value="" disabled selected>Quantity of Trash (Please choose one of the options)</option>
                  <option value="Minimal">Minimal (A few pieces of trash)</option>
                  <option value="Low">Low (Less than 1-2 trash bags needed)</option>
                  <option value="Moderate">Moderate (2-3 trash bags likely needed)</option>
                  <option value="High">High (4+ trash bags needed and/or giant items such as a car tire) </option>
                  <option value="Severe">Severe (a whole truck bed might not be enough room)</option>
                </select>

                <br />

                {/* <label><strong>Hazardness Level</strong></label> */}
                {/* updating the state with the value of the input */}
                <select className="form-control" name='category' onChange={event => this.setState({ hazardnessLevel: event.target.value })} >
                  <option value="" disabled selected>Hazardness Level (Please choose one of the options)</option>
                  <option value="Low">Low (General Plastic and Paper Waste)</option>
                  <option value="Moderate">Moderate (Household chemical containers)</option>
                  <option value="High">High (Industrial Supplies and Materials) </option>
                  <option value="Severe">Severe (biohazard waste (needles, etc), industrial chemicals)</option>
                </select>

                <br/>

                {/* <label><strong>Latitude</strong></label> */}
                {/* updating the state with the value of the input */}
                <input type='text' readOnly className='form-control' placeholder={`Latitude: ${this.updateLat()}`}
                />

                <br/>

                {/* <label><strong>Longitude</strong></label> */}
                {/* updating the state with the value of the input */}
                <input type='text' readOnly className='form-control' placeholder={`Longitude: ${this.updateLng()}`}
                />

                {/* button to handle the start of the function that will pass 
                the new trash info to database */}
                <button className="submit-contact-button mt-3" type="button" onClick={this.handleSubmitNewTrash}>Submit</button>

              </div>
            </form>
          </div>
        </div>
        
        <div className="text-center py-2" style={{backgroundColor: "#f5f5f5"}}>
          <h5 className="pt-1"><strong>Click on map to find the Latitude and Longitude</strong></h5>
          <p><strong>(Your form submission will autofill with clicked Location)</strong></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { trash: state.trash, coordinates: state.coordinates};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ addTrashInformation, setCoordinates, getTrashData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(Form);
