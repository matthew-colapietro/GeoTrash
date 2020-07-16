import React, { Component } from "react";
import "../styling/Header.css";
import { Link } from "react-router-dom";

import AdminPage from "./AdminPage";


class Header extends Component {
  render() {
    return (
      <div id="header">
        
        <Link to="/admin">
          <img id="admin-button"/>
        </Link>
      </div>
    );
  }
}




export default Header;