import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ApolloClient } from "apollo-client";
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";

import { createStore, applyMiddleware } from "redux";
import { apolloReducer } from "apollo-cache-redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import ReduxLink from "apollo-link-redux";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
// import _ from "lodash";

import AuthReducer from "../reducers/AuthReducer";
import { logout } from "../actions/AuthActions";

const URL = "localhost:8080";

// redux
const config = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["apollo"] // don't persist nav for now
};

const reducer = persistCombineReducers(config, {
  apollo: apolloReducer,
  AuthReducer
});

export const store = createStore(
  reducer,
  {}, // initial state
  composeWithDevTools(applyMiddleware(thunk))
);

// persistent storage, used in app
export const persistor = persistStore(store);

// TODO use Redux instead.
// const cache = new ReduxCache({ store });
const cache = new InMemoryCache();

const reduxLink = new ReduxLink(store);

// ==========================================

// middleware for requests
const middlewareLink = setContext((req, previousContext) => {
  // get the authentication token from local storage if it exists
  const { jwt } = store.getState().AuthReducer;
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    };
  }
});

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
      store.dispatch(logout());
    }
  }
  if (networkError) {
    console.log("[Network error]:");
    console.log({ networkError });
    if (networkError.statusCode === 401) {
      logout();
    }
  }
});

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/graphql`, {
  lazy: true,
  reconnect: true,
  connectionParams() {
    return { Authorization: `bearer ${store.getState().AuthReducer.jwt}` };
  }
});

// used for subscriptions
const webSocketLink = new WebSocketLink(wsClient);

// used for queries and mutations
const httpLink = new HttpLink({
  uri: `http://${URL}`
});

const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);

      return kind === "OperationDefinition" && operation === "subscription";
    },
    subscriptionLink,
    queryOrMutationLink
  );

const link = ApolloLink.from([
  //afterwear
  reduxLink,
  errorLink,
  requestLink({
    queryOrMutationLink: middlewareLink.concat(httpLink),
    subscriptionLink: webSocketLink
  })
]);

export const client = new ApolloClient({
  link,
  cache
});
