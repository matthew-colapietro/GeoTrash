import React, { Component } from "react";
import Header from "./Header"
import MapContainer  from "./MapContainer";
import Form from "./Form";
import Footer from "./Footer"

import '../styling/App.css'

import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route } from "react-router-dom";
import AdminPage from "./AdminPage";

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} render={
            () => {
              return (
                <div>
                  <Header />
                  <Form />
                  <MapContainer />
                  <Footer />
                </div>
              )
            }
          }/>
          <Route path={"/admin"} component={AdminPage} />
        </Switch>
      </div>
    )
  }
}

export default App;