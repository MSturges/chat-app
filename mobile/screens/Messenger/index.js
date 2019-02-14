import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";

import { withTheme } from "../../contexts/ThemeContext";
import MessengerView from "./MessengerView";
import { FRAGMENT } from "./Message";

const ITEMS_PER_PAGE = 10;
class Messages extends Component {
  render() {
    const { id, theme } = this.props;
    const s = styles(theme);
    return (
      <Query
        query={GROUP_QUERY}
        variables={{ groupId: id, first: ITEMS_PER_PAGE }}
      >
        {({ data: { group }, loading, fetchMore }) => {
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

          return (
            <MessengerView
              group={group}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              loadMoreEntries={loadMoreEntries}
            />
          );
        }}
      </Query>
    );
  }
}

const GROUP_QUERY = gql`
  query group(
    $groupId: Int!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    group(id: $groupId) {
      id
      name
      users {
        id
        username
      }

      messages(first: $first, after: $after, last: $last, before: $before) {
        edges {
          cursor
          node {
            ...MessageFragment
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
  ${FRAGMENT}
`;

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
