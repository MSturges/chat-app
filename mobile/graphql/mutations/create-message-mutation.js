import gql from "graphql-tag";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($message: String!, $userId: ID!, $groupId: ID!) {
    createMessage(message: $message, userId: $userId, groupId: $groupId) {
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

export default CREATE_MESSAGE_MUTATION;
