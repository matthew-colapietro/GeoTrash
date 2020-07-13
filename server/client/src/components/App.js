import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import MapContainer  from "./MapContainer";


class App extends Component {
  constructor() {
    super()


  }

  render() {
    return (
      <div>
        <h1 className= "text-center mt-2" >GeoTrash</h1>
        <MapContainer />
      </div>
    )
  }
}

export default App;