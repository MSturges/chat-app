import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { _ } from "lodash";

import { withTheme } from "../../contexts/ThemeContext";

class Group extends Component {
  render() {
    const { id, name } = this.props.group.item;
    const goToMessagesSceen = () => Actions.messenger({ id, title: name });
    const s = styles(this.props.theme);

    return (
      <TouchableHighlight
        key={id}
        onPress={goToMessagesSceen}
        style={s.hightlight}
      >
        <View style={s.groupContainer}>
          <Text style={s.groupName}>{`${name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    hightlight: {
      marginBottom: 16
    },
    groupContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.primaryTwo,
      height: 50,

      shadowColor: "rgb(0,0,0)",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3
    },
    groupName: {
      fontWeight: "bold",
      flex: 0.7,
      color: theme.fontPrimary
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
