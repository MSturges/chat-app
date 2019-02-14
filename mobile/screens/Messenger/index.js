import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";
import update from "immutability-helper";

import { withTheme } from "../../contexts/ThemeContext";
import MessengerView from "./MessengerView";
import GROUP_QUERY from "../../graphql/queries/group-query";
import MESSAGE_ADDED_SUBSCRIPTION from "../../graphql/subscriptions/message-added-subscription";

const ITEMS_PER_PAGE = 10;

class Messages extends Component {
  //

  render() {
    // id is groupID
    const { id, theme } = this.props;
    const s = styles(theme);
    return (
      <Query
        query={GROUP_QUERY}
        variables={{ groupId: id, first: ITEMS_PER_PAGE }}
      >
        {({ data: { group }, loading, fetchMore, subscribeToMore }) => {
          if (loading) {
            return (
              <View style={[s.loading, s.container]}>
                <ActivityIndicator />
              </View>
            );
          }

          const loadMoreEntries = () => {
            return fetchMore({
              // GROUP_QUERY is used by default)
              variables: {
                // load more queries starting from the cursor of the last (oldest) message
                after:
                  group.messages.edges[group.messages.edges.length - 1].cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // we will make an extra call to check if no more entries
                if (!fetchMoreResult) {
                  return previousResult;
                }
                // push results (older messages) to end of messages list
                return update(previousResult, {
                  group: {
                    messages: {
                      edges: { $push: fetchMoreResult.group.messages.edges },
                      pageInfo: {
                        $set: fetchMoreResult.group.messages.pageInfo
                      }
                    }
                  }
                });
              }
            });
          };

          const subscribeToNewMessages = () => {
            console.log("subscribe to group", id);
            return subscribeToMore({
              document: MESSAGE_ADDED_SUBSCRIPTION,
              variables: {
                userId: 1, // fake the user for now
                groupIds: [id]
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                const newMessage = subscriptionData.data.messageAdded;
                return update(previousResult, {
                  group: {
                    messages: {
                      edges: {
                        $unshift: [
                          {
                            __typename: "MessageEdge",
                            node: newMessage,
                            cursor: Buffer.from(
                              newMessage.id.toString()
                            ).toString("base64")
                          }
                        ]
                      }
                    }
                  }
                });
              }
            });
          };

          return (
            <MessengerView
              group={group}
              groupId={id}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              loadMoreEntries={loadMoreEntries}
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
