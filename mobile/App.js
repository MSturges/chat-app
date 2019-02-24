import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { client, persistor, store } from "./lib/apollo-client";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider>
              <AppNavigator />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
