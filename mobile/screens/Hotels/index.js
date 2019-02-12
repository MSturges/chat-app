import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";

const Hotels = props => {
  const s = styles(props.theme);

  return (
    <Query query={HotelQuery}>
      {({ loading, data }) => {
        if (loading) return <Text>Loading</Text>;
        console.log("data", data);
        return (
          <Layout>
            <View style={s.container}>
              <Text>Hey</Text>
            </View>
          </Layout>
        );
      }}
    </Query>
  );
};

const HotelQuery = gql`
  {
    testString
  }
`;

const styles = theme =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.primaryOne,
      flex: 1
    }
  });

export default withTheme(Hotels);
