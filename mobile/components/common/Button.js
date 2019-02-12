import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import ThemeContext from "../../contexts/ThemeContext";

const Button = ({ onPress, children, style, loading, hover }) => {
  const hoverStyle = hover ? styles.buttonHover : null;
  return (
    <ThemeContext.Consumer>
      {theme => (
        <TouchableOpacity
          onPress={onPress}
          style={[styles(theme).button, style, hoverStyle]}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles(theme).text}>{children}</Text>
          )}
        </TouchableOpacity>
      )}
    </ThemeContext.Consumer>
  );
};

Button.defaultProps = {
  loading: false
};

const styles = theme =>
  StyleSheet.create({
    button: {
      alignSelf: "stretch",
      backgroundColor: theme.green,
      borderRadius: 5,
      height: 60,
      paddingVertical: 16
    },
    text: {
      alignSelf: "center",
      color: "white",
      fontSize: 16,
      fontWeight: "600"
    },
    buttonHover: {
      shadowColor: "rgb(0,0,0)",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3
    }
  });

export { Button };
