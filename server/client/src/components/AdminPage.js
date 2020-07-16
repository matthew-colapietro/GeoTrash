import React, { Component } from "react";
import Header from "./Header"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTrashData } from "../actions"  

import 'bootstrap/dist/css/bootstrap.css';


class AdminPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Header />
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