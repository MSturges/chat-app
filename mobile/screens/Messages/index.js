import { _ } from "lodash";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import randomColor from "randomcolor";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withTheme } from "../../contexts/ThemeContext";
import Message from "./Message";

class Messages extends Component {
  //
  renderItem = message => {
    return (
      <Message
        color={randomColor()}
        isCurrentUser={message.item.from.id === 1} // for now until we implement auth
        message={message.item}
      />
    );
  };

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
            <View style={s.container}>
              <FlatList
                data={data.group.messages.slice().reverse()}
                keyExtractor={message => message.id.toString()}
                renderItem={this.renderItem}
                ListEmptyComponent={<View />}
              />
            </View>
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
        id
        from {
          id
          username
        }
        createdAt
        text
      }
    }
  }
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
