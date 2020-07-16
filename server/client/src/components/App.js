import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import MapContainer  from "./MapContainer";
import Form from "./Form";


class App extends Component {

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