import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { Query } from "react-apollo";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";
import GroupList from "./GroupList";
import USER_QUERY from "../../graphql/queries/user-query";

class Groups extends Component {
  keyExtractor = item => item.id.toString();

  render() {
    const s = styles(this.props.theme);

    return (
      <Query
        query={USER_QUERY}
        variables={{ userId: "5c6af3affb0ff40eb602aa89" }}
        skip={true}
      >
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
              <Text>groups would be here...</Text>
            </Layout>
          );
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
