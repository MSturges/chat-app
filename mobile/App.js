import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import { client } from "./lib/apollo-client";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

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
