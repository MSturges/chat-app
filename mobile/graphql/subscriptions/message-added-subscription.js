import gql from "graphql-tag";
import MESSAGE_FRAGMENT from "../fragments/message-fragment";

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription onMessageAdded($groupIds: [Int], $userId: Int) {
    messageAdded(groupIds: $groupIds, userId: $userId) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;
export default MESSAGE_ADDED_SUBSCRIPTION;
