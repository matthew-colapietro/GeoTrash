import React, { Component } from "react";
import "../styling/Header-Footer.css";
import { Link } from "react-router-dom";
import { urlencoded } from "body-parser";
import Logo from "../assets/GeoTrash-Logo.png"


class Header extends Component {
  render() {
    return (
      <div id="header">

        <Link to="/">
          <img className="logo-full" src={Logo} alt="Logo"></img>
        </Link>
        
        <Link to="/admin">
          <button className="admin-button" id="admin-button" alt="The admin button">
            <span className="pr-4">Management</span>
          </button>
        </Link>

      </div>
    );
  }
}


export default Header;