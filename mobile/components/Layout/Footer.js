import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { withTheme } from "../../contexts/ThemeContext";

const Footer = ({ theme }) => {
  const s = styles(theme);

  return (
    <SafeAreaView style={s.container}>
      <TouchableOpacity onPress={Actions.hotels} style={s.tabs}>
        <MaterialCommunityIcons
          name="hotel"
          size={40}
          color={theme.footerIcon}
        />
        <Text style={s.text}>Hotels</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Actions.settings} style={s.tabs}>
        <MaterialCommunityIcons
          name="settings"
          size={40}
          color={theme.footerIcon}
        />
        <Text style={s.text}>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.footerBackground,
      flexDirection: "row",
      elevation: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderColor: theme.footerTopBorder,
      borderTopWidth: 1
    },
    tabs: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 8
    },
    text: {
      fontSize: 10,
      color: theme.footerText
    }
  });

export default withTheme(Footer);
