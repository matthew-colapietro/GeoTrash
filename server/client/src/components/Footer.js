import React, { Component } from "react";
import "../styling/Header-Footer.css";
import 'bootstrap/dist/css/bootstrap.css';

class Footer extends Component {
  render() {
    return (
      <div id="footer" className="fixed-bottom mt-2">
        <div className="name">
          <p>Matthew Colapietro</p>
        </div>
        <div className="year">
          <p>© 2020 GeoTrash</p>
        </div>
      </div>
    );
  }
}




export default Footer;