import gql from "graphql-tag";

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded($groupIds: [ID]!, $userId: ID!) {
    messageAdded(groupIds: $groupIds, userId: $userId) {
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
