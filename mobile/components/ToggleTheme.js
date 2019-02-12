import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import ThemeContext from "../contexts/ThemeContext";

const ToggleTheme = () => (
  <ThemeContext.Consumer>
    {theme => (
      <View>
        <TouchableOpacity
          style={styles(theme).toggleThemeCard}
          onPress={() => theme.toggleTheme()}
        >
          <Ionicons
            name="md-moon"
            size={60}
            color="green"
            style={styles(theme).icon}
          />
        </TouchableOpacity>
      </View>
    )}
  </ThemeContext.Consumer>
);

const styles = theme =>
  StyleSheet.create({
    toggleThemeCard: {
      backgroundColor: theme.primaryTwo,
      height: 160,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 8,
      marginBottom: 16,

      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.37,
      shadowRadius: 6,
      elevation: 12
    },
    text: {
      color: theme.fontPrimary
    },
    icon: {
      color: theme.selectedTheme === "light" ? theme.black : theme.green
    }
  });

export default ToggleTheme;
