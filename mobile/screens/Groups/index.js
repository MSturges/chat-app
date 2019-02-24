import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { Query, compose } from "react-apollo";
import { connect } from "react-redux";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";
import GroupList from "./GroupList";
import USER_QUERY from "../../graphql/queries/user-query";

class Groups extends Component {
  keyExtractor = item => item.id.toString();

  render() {
    const { id } = this.props.AuthReducer;
    const s = styles(this.props.theme);

    return (
      <Query query={USER_QUERY} variables={{ userId: id }} skip={!id}>
        {({ data, loading }) => {
          if (loading) {
            return (
              <View style={[s.loading, s.container]}>
                <ActivityIndicator />
              </View>
            );
          }
          if (!id) {
            return (
              <Layout>
                <View style={s.container}>
                  <Text>Login to chat</Text>
                </View>
              </Layout>
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

const styles = theme =>
  StyleSheet.create({
    container: {
      alignSelf: "stretch",
      backgroundColor: theme.primaryOne,
      zIndex: 1,
      paddingVertical: 16,
      paddingHorizontal: 8
    },
    loading: {
      justifyContent: "center",
      flex: 1
    }
  });

const mapStateToProps = ({ AuthReducer }) => ({
  AuthReducer
});

export default compose(
  connect(mapStateToProps),
  withTheme
)(Groups);
