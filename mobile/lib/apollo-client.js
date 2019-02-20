import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-client";
import { AsyncStorage } from "react-native";

import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import _ from "lodash";

const URL = "localhost:8080";

// afterware for responses
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;
  if (graphQLErrors) {
    console.log({ graphQLErrors });
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log({ message, locations, path });
      if (message === "Unauthorized") {
        shouldLogout = true;
      }
    });

    if (shouldLogout) {
      // we may need to use redux or some sort of state manager...needs refactor
      AsyncStorage.setItem("user", JSON.stringify(user))
        .then(res => console.log("res", res))
        .catch(err => {
          console.log("err", err);
        });
      wsClient.unsubscribeAll(); // unsubscribe from all subscriptions
      wsClient.close(); // close the WebSocket connection
    }
  }
  if (networkError) {
    console.log("[Network error]:");
    console.log({ networkError });
    if (networkError.statusCode === 401) {
      // we may need to use redux or some sort of application state manager...needs refactor
      // logout();
    }
  }
});

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/graphql`, {
  lazy: true,
  reconnect: true,
  // we may need to use redux or some sort of application state manager...needs refactor
  connectionParams() {
    // get the authentication token from local storage if it exists
    return AsyncStorage.getItem("user").then(res => {
      if (res) {
        const user = JSON.parse(res);
        if (user.jwt) {
          return { jwt: user.jwt };
        }
      }
    });
  }
});

const httpLink = new HttpLink({
  uri: `http://${URL}`
});

const webSocketLink = new WebSocketLink(wsClient);

const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);

      return kind === "OperationDefinition" && operation === "subscription";
    },
    subscriptionLink,
    queryOrMutationLink
  );

// middleware for requests
const middlewareLink = setContext((req, previousContext) => {
  // get the authentication token from local storage if it exists
  return AsyncStorage.getItem("user").then(res => {
    if (res) {
      const user = JSON.parse(res);
      if (user.jwt) {
        return {
          headers: {
            authorization: `Bearer ${user.jwt}`
          }
        };
      }
      return previousContext;
    }
    return previousContext;
  });
});

const link = ApolloLink.from([
  errorLink,
  requestLink({
    queryOrMutationLink: middlewareLink.concat(httpLink),
    subscriptionLink: webSocketLink
  })
]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});
