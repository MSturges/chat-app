import { _ } from "lodash";
import { FlatList, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { Component } from "react";
import randomColor from "randomcolor";

import { withTheme } from "../../contexts/ThemeContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

class MessageList extends Component {
  constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.group && props.group.users) {
      props.group.users.forEach(user => {
        usernameColors[user.username] = randomColor();
      });
    }
    this.state = {
      usernameColors
    };
  }

  componentDidMount() {
    this.scrollToBottomOfMessagesList();
  }

  componentWillReceiveProps(nextProps) {
    const usernameColors = {};
    // check for new messages
    if (nextProps.group) {
      if (nextProps.group.users) {
        // apply a color to each user
        nextProps.group.users.forEach(user => {
          usernameColors[user.username] =
            this.state.usernameColors[user.username] || randomColor();
        });
      }
      this.setState({
        usernameColors
      });
    }
  }

  renderItem = message => {
    return (
      <Message
        color={this.state.usernameColors[message.item.from.username]}
        isCurrentUser={message.item.from.id === 1} // for now until we implement auth
        message={message.item}
      />
    );
  };

  scrollToBottomOfMessagesList = () => {
    console.log("scroll");
    this.flatList.scrollToEnd({ animated: true });
  };

  render() {
    const { theme, group } = this.props;
    const s = styles(theme);

    return (
      <KeyboardAvoidingView
        behavior={"position"}
        contentContainerStyle={s.container}
        keyboardVerticalOffset={64}
        style={s.container}
      >
        <FlatList
          data={group.messages.slice().reverse()}
          keyExtractor={message => message.id.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
          ref={ref => (this.flatList = ref)}
          // onLayout={() => this.scrollToBottomOfMessagesList()}
        />
        <MessageInput
          groupId={group.id}
          userId={1}
          flatListRef={this.flatList}
          scrollToBottomOfMessagesList={this.scrollToBottomOfMessagesList}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      alignItems: "stretch",
      backgroundColor: "#e5ddd5",
      flex: 1,
      flexDirection: "column"
    }
  });

export default withTheme(MessageList);
