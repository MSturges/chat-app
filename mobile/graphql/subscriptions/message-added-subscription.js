import gql from "graphql-tag";

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription messageAdded($groupIds: ID!) {
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
