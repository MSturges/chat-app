import { _ } from "lodash";
import { FlatList, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { Component } from "react";
import randomColor from "randomcolor";

import { withTheme } from "../../contexts/ThemeContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

class MessengerView extends Component {
  constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.group && props.group.users) {
      props.group.users.forEach(user => {
        usernameColors[user.username] = randomColor();
      });
    }
    this.state = {
      usernameColors,
      refreshing: false
    };
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

  renderItem = ({ item: edge }) => {
    const message = edge.node;
    return (
      <Message
        color={this.state.usernameColors[message.from.username]}
        isCurrentUser={message.from.id === 1} // for now until we implement auth
        message={message}
      />
    );
  };

  scrollToBottomOfMessagesList = () => {
    this.flatList.scrollToIndex({ index: 0, animated: true });
  };

  onEndReached = () => {
    // on reach end load more entries
    if (
      !this.state.loadingMoreEntries &&
      this.props.group.messages.pageInfo.hasNextPage
    ) {
      this.setState({
        loadingMoreEntries: true
      });
      this.props.loadMoreEntries().then(() => {
        this.setState({
          loadingMoreEntries: false
        });
      });
    }
  };

  render() {
    const { theme, group, ITEMS_PER_PAGE } = this.props;
    const s = styles(theme);
    // console.log("group", group);
    return (
      <KeyboardAvoidingView
        behavior={"position"}
        contentContainerStyle={s.container}
        keyboardVerticalOffset={64}
        style={s.container}
      >
        <FlatList
          inverted
          // data={group.messages}
          data={group.messages.edges}
          keyExtractor={item => item.node.id.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
          ref={ref => (this.flatList = ref)}
          onEndReached={this.onEndReached}

          // onLayout={() => this.scrollToBottomOfMessagesList()}
        />
        <MessageInput
          groupId={group.id}
          userId={1}
          flatListRef={this.flatList}
          // scrollToBottomOfMessagesList={this.scrollToBottomOfMessagesList}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
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

export default withTheme(MessengerView);
