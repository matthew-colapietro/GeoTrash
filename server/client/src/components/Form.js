import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/Form.css'

import { addTrashInformation } from "../actions"


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
      latitude: null,
      longitude: null
    }

    this.handleSubmitNewTrash = this.handleSubmitNewTrash.bind(this);
  }

  handleSubmitNewTrash () {
    if(!this.state.reporterName || !this.state.phoneNumber || !this.state.email || !this.state.trashImage || !this.state.trashQuantity || !this.state.hazardnessLevel || !this.state.longitude || !this.state.latitude) {
      alert('Please ensure all fields are entered')
      return console.log(this.state)
    } else {
      this.props.addTrashInformation(this.state.reporterName, this.state.phoneNumber, this.state.email, this.state.trashImage, this.state.trashQuantity, this.state.hazardnessLevel, this.state.longitude, this.state.latitude)
      console.log(this.state)
    }
    
    
    
  }

  render() {
    return (
      <div className="main-form row">
    
        <div className="col-md-12" id="form-input">
          
          <div className="page-header text-center mt-5">
            <h2 className="pb-3"><span>Submit New Trash Location</span></h2>
          </div>

           {/* form to hold the values the user will submit to add a new contact */}
          <form className="row">
            
            <div className="col-md-5 offset-md-1">
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
            
            <div className="col-md-5 pl-2">

              {/* <label><strong>Quantity of Trash</strong></label> */}
              {/* updating the state with the value of the input */}
              <select type='text' className='form-control' placeholder="Quantity of Trash" onChange={event => this.setState({ trashQuantity: event.target.value })}>
              <option value="" disabled selected>Quantity of Trash (Please choose one of the options)</option>
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
              <input type='text' className='form-control' placeholder="latitude" onChange={event => this.setState({ latitude: parseFloat(event.target.value) })
              }/>

              <br/>

              {/* <label><strong>Longitude</strong></label> */}
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' placeholder="longitude" onChange={event => this.setState({ longitude: parseFloat(event.target.value) })
              }/>

              {/* button to handle the start of the function that will pass 
              the new trash info to database */}
              <button className="submit-contact mt-3" type="button" onClick={this.handleSubmitNewTrash}>Submit</button>

            </div>
          </form>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { trash: state.trash};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ addTrashInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(Form);
