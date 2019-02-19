import gql from "graphql-tag";

const USER_QUERY = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      id
      email
      username
      chatGroups {
        id
        name
      }
    }
  }
`;

export default USER_QUERY;
