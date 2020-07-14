import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import MapContainer  from "./MapContainer";
import Form from "./Form";


class App extends Component {
  constructor() {
    super()


  }

  render() {
    return (
      <div>
        <h1 className= "text-center mt-2" >GeoTrash</h1>
        <Form />
        <MapContainer />
        
      </div>
    )
  }
}

export default App;