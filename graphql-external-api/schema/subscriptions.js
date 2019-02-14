import { PubSub } from "apollo-server";
export const pubsub = new PubSub();
export default pubsub;

// First, we’ll use apollo-server to create a PubSub manager.
// PubSub is basically just event emitters wrapped with a function that filters messages.
// It can easily be replaced later with something more scalable like graphql-redis-subscriptions.
