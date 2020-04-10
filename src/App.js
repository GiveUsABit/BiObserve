import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bulma/css/bulma.css";
import { Home } from "./pages/home";
import { Sightings } from "./pages/sightings";

function App() {

  return (

      <Router>
        <Switch>
          <Route path="/sightings">
            <Sightings />
            </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
