import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { withTheme } from "../../contexts/ThemeContext";
import Layout from "../../components/Layout";
import ToggleTheme from "../../components/ToggleTheme";

const Settings = props => {
  const s = styles(props.theme);

  return (
    <Layout>
      <View style={s.container}>
        <ToggleTheme />
      </View>
    </Layout>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryOne,
      margin: 16
    }
  });

export default withTheme(Settings);
