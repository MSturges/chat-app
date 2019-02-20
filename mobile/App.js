import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import { client } from "./lib/apollo-client";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
