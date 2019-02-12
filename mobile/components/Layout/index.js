import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { withTheme } from "../../contexts/ThemeContext";

import Footer from "./Footer";

const Layout = ({ children, theme }) => (
  <SafeAreaView style={styles(theme).container}>
    {children}
    <Footer />
  </SafeAreaView>
);

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryOne
    }
  });

export default withTheme(Layout);
