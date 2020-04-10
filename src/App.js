import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bulma/css/bulma.css";
import { Home } from "./pages/home";
import { Sightings } from "./pages/sightings";
import { ApolloClient, gql, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "https://biobserve.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "biobserve"
  }
});

const client = new ApolloClient({
  cache,
  link
});

function App() {

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>

  );
}

export default App;
