import gql from "graphql-tag";

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded($groupIds: ID!) {
    messageAdded(groupIds: $groupIds) {
      id
      to {
        id
      }
      from {
        id
        username
      }
      message
      createdAt
    }
  }
`;
export default MESSAGE_ADDED_SUBSCRIPTION;
