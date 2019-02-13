import React, { Component } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { withTheme } from "../../contexts/ThemeContext";
import Group from "./Group";

class GroupList extends Component {
  render() {
    const { theme, data } = this.props;
    const s = styles(theme);

    return (
      <FlatList
        data={data.user.groups}
        keyExtractor={item => item.id.toString()}
        renderItem={item => <Group group={item} />}
        style={s.list}
      />
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: theme.primaryOne
    },
    list: {
      alignSelf: "stretch",
      backgroundColor: theme.primaryOne,
      zIndex: 1
    },
    loading: {
      justifyContent: "center",
      flex: 1
    }
  });

export default withTheme(GroupList);
