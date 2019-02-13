import React, { Component } from "react";
import { FlatList, StyleSheet, ActivityIndicator, View } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";
import GroupList from "./GroupList";

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
              <GroupList data={data} />
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
    loading: {
      justifyContent: "center",
      flex: 1
    }
  });

export default withTheme(Groups);
