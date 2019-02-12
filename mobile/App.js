import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { ThemeProvider } from "./contexts/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

const httpLink = new HttpLink({
  uri: "http://localhost:8080"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
