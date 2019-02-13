import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { _ } from "lodash";

import { withTheme } from "../../contexts/ThemeContext";

class Group extends Component {
  render() {
    const { id, name } = this.props.group;
    const goToMessagesSceen = () => Actions.messages({ id, title: name });
    const s = styles(this.props.theme);

    return (
      <TouchableHighlight key={id} onPress={goToMessagesSceen}>
        <View style={s.groupContainer}>
          <Text style={s.groupName}>{`${name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    groupContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      borderBottomColor: "#eee",
      borderBottomWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 8
    },
    groupName: {
      fontWeight: "bold",
      flex: 0.7
    },
    loading: {
      justifyContent: "center",
      flex: 1
    }
  });

Group.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};

export default withTheme(Group);
