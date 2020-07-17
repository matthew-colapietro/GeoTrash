import React, { Component } from "react";
import "../styling/Header.css";
import { Link } from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <div id="header">
        
        <Link to="/admin">
          <button className="admin-button" id="admin-button" alt="The admin button">Land Management</button>
        </Link>
      </div>
    );
  }
}




export default Header;