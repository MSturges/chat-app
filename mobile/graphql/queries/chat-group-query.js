import gql from "graphql-tag";

const CHAT_GROUP_QUERY = gql`
  query chatGroup($groupId: ID!) {
    chatGroup(id: $groupId) {
      id
      name
      users {
        id
        username
        email
      }
      messages {
        id
        from {
          id
          username
        }
        to {
          id
        }
        message
        createdAt
      }
    }
  }
`;

export default CHAT_GROUP_QUERY;
