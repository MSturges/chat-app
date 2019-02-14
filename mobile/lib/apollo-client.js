import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { onError } from "apollo-link-error";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const URL = "http://localhost:8080";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log({ graphQLErrors });
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log({ message, locations, path });
      if (message === "Unauthorized") {
        shouldLogout = true;
      }
    });
  }
  if (networkError) {
    console.log("[Network error]:");
    console.log({ networkError });
  }
});

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/graphql`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  }
});

const httpLink = new HttpLink({
  uri: URL
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

const link = ApolloLink.from([
  errorLink,
  requestLink({
    queryOrMutationLink: httpLink,
    subscriptionLink: webSocketLink
  })
]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});
