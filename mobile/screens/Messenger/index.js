import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Query } from "react-apollo";

import { withTheme } from "../../contexts/ThemeContext";
import MessengerView from "./MessengerView";
import CHAT_GROUP_QUERY from "../../graphql/queries/chat-group-query";
import MESSAGE_ADDED_SUBSCRIPTION from "../../graphql/subscriptions/message-added-subscription";

const ITEMS_PER_PAGE = 10;

class Messages extends Component {
  render() {
    const { id, theme } = this.props;

    const s = styles(theme);
    return (
      <Query
        query={CHAT_GROUP_QUERY}
        variables={{ groupId: id, first: ITEMS_PER_PAGE }}
      >
        {({ data: { chatGroup }, loading, fetchMore, subscribeToMore }) => {
          if (loading) {
            return (
              <View style={[s.loading, s.container]}>
                <ActivityIndicator />
              </View>
            );
          }
          // const loadMoreEntries = () => {
          //   return fetchMore({
          //     // GROUP_QUERY is used by default)
          //     variables: {
          //       // load more queries starting from the cursor of the last (oldest) message
          //       after:
          //         group.messages.edges[group.messages.edges.length - 1].cursor
          //     },
          //     updateQuery: (previousResult, { fetchMoreResult }) => {
          //       // we will make an extra call to check if no more entries
          //       if (!fetchMoreResult) {
          //         return previousResult;
          //       }
          //       // push results (older messages) to end of messages list
          //       return update(previousResult, {
          //         group: {
          //           messages: {
          //             edges: { $push: fetchMoreResult.group.messages.edges },
          //             pageInfo: {
          //               $set: fetchMoreResult.group.messages.pageInfo
          //             }
          //           }
          //         }
          //       });
          //     }
          //   });
          // };

          const subscribeToNewMessages = () =>
            subscribeToMore({
              document: MESSAGE_ADDED_SUBSCRIPTION,
              variables: {
                groupIds: id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                if (!subscriptionData.data) return previousResult;
                const newMessage = subscriptionData.data.messageAdded;
                return Object.assign({}, previousResult, {
                  chatGroup: {
                    __typename: "ChatGroup",
                    users: previousResult.chatGroup.users,
                    id: previousResult.chatGroup.id,
                    name: previousResult.chatGroup.name,
                    messages: [newMessage, ...previousResult.chatGroup.messages]
                  }
                });
              }
            });

          return (
            <MessengerView
              chatGroup={chatGroup}
              groupId={id}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              // loadMoreEntries={loadMoreEntries}
              subscribeToNewMessages={subscribeToNewMessages}
            />
          );
        }}
      </Query>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      alignItems: "stretch",
      backgroundColor: "#e5ddd5",
      flex: 1,
      flexDirection: "column"
    }
  });

export default withTheme(Messages);
