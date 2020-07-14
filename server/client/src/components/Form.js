import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../styling/Form.css'


class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: null,
      reporterName: '',
      phoneNumber: null,
      email: '',
      trashImage: '',
      trashQuantity: null,
      hazardnessLevel: '',
    }

  }

  render() {
    return (
      <div className="main-form row">
    
        <div className="col-md-12">
          
          <div className="page-header text-center mt-5">
            <h2>Submit New Trash Location</h2>
          </div>

           {/* form to hold the values the user will submit to add a new contact */}
          <form className="row">
            
            <div className="col-md-5 offset-md-1">
              <label><strong>Reporter name</strong></label>
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' onChange={event => this.setState({ reporterName: event.target.value })
              }/>

              <br/>

              <label><strong>Contact Number</strong></label>
              {/* changing the phone number input to an integer to add to the state */}
              <input type='text' className='form-control' onChange={event => this.setState({ phoneNumber: parseInt(event.target.value, 10) })
              }/>

              <br/>

              <label><strong>Contact Email</strong></label>
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' onChange={event => this.setState({ email: event.target.value })
              }/>

            </div>

            <br/>
            
            <div className="col-md-5 pl-2">
              <label><strong>Image of Trash</strong></label>
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' placeholder="Optional" onChange={event => this.setState({ trashImage: event.target.value })
              }/>

              <br />

              <label><strong>Quantity of Trash</strong></label>
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' onChange={event => this.setState({ trashQuantity: parseInt(event.target.value, 10) })
              }/>

              <br />

              <label><strong>Hazardness Level</strong></label>
              {/* updating the state with the value of the input */}
              <input type='text' className='form-control' onChange={event => this.setState({ hazardnessLevel: event.target.value })
              }/>

              {/* button to handle the start of the function that will pass 
              the new contact info to App.js */}
              <button className="submit-contact mt-3" type="button" onClick={this.handleSubmitNewContact}>Submit</button>
            </div>
          </form>

        </div>

      </div>
    );
  }
}

export default Form;
