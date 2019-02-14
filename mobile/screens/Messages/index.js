import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withTheme } from "../../contexts/ThemeContext";
import MessageList from "./MessageList";
import { FRAGMENT } from "./Message";

class Messages extends Component {
  render() {
    const { id, theme } = this.props;
    const s = styles(theme);
    return (
      <Query query={GROUP_QUERY} variables={{ groupId: id }}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <View style={[s.loading, s.container]}>
                <ActivityIndicator />
              </View>
            );
          }

          return (
            <MessageList
              group={data.group}
              setMessageListRef={this.setMessageListRef}
            />
          );
        }}
      </Query>
    );
  }
}

const GROUP_QUERY = gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      id
      name
      users {
        id
        username
      }
      messages {
        ...MessageFragment
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
