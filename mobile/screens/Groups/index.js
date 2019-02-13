import React, { Component } from "react";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import { _ } from "lodash";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";
import Group from "./Group";

class Groups extends Component {
  keyExtractor = item => item.id.toString();

  render() {
    const s = styles(this.props.theme);

    return (
      <Query query={USER_QUERY} variables={{ id: 1 }}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <View style={[s.loading, s.container]}>
                <ActivityIndicator />
              </View>
            );
          }

          return (
            <Layout>
              <FlatList
                data={data.user.groups}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }) => <Group group={item} />}
                style={s.list}
              />
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export const USER_QUERY = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      email
      username
      groups {
        id
        name
      }
    }
  }
`;

const styles = theme =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.primaryOne
    },
    list: {
      alignSelf: "stretch",
      backgroundColor: theme.primaryOne,
      zIndex: 1
    },
    loading: {
      justifyContent: "center",
      flex: 1
    }
  });

export default withTheme(Groups);
