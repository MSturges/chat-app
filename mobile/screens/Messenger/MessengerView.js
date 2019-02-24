import React, { Component } from "react";
import { FlatList, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { _ } from "lodash";
import randomColor from "randomcolor";
import { connect } from "react-redux";
import { compose } from "react-apollo";

import { withTheme } from "../../contexts/ThemeContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

class MessengerView extends Component {
  constructor(props) {
    super(props);
    const usernameColors = {};
    if (props.chatGroup && props.chatGroup.users) {
      props.chatGroup.users.forEach(user => {
        usernameColors[user.username] = randomColor();
      });
    }
    console.log("usernameColors", usernameColors);
    this.state = {
      usernameColors,
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.subscribeToNewMessages();
  }

  componentWillReceiveProps(nextProps) {
    const usernameColors = {};
    // check for new messages
    if (nextProps.chatGroup) {
      if (nextProps.chatGroup.users) {
        // apply a color to each user
        console.log("nextProps.chatGroup.users", nextProps.chatGroup.users);
        nextProps.chatGroup.users.forEach(user => {
          usernameColors[user.username] =
            this.state.usernameColors[user.username] || randomColor();
        });
      }
      this.setState({
        usernameColors
      });
    }
  }

  renderItem = ({ item }) => {
    return (
      <Message
        color={this.state.usernameColors[item.from.username]}
        isCurrentUser={item.from.id == this.props.AuthReducer.id} // for now until we implement auth
        message={item}
      />
    );
  };

  scrollToBottomOfMessagesList = () => {
    this.flatList.scrollToIndex({ index: 0, animated: true });
  };

  // onEndReached = () => {
  //   // on reach end load more entries
  //   if (
  //     !this.state.loadingMoreEntries &&
  //     this.props.chatGroup.messages.pageInfo.hasNextPage
  //   ) {
  //     this.setState({
  //       loadingMoreEntries: true
  //     });
  //     this.props.loadMoreEntries().then(() => {
  //       this.setState({
  //         loadingMoreEntries: false
  //       });
  //     });
  //   }
  // };

  render() {
    const { theme, chatGroup } = this.props;
    const s = styles(theme);
    return (
      <KeyboardAvoidingView
        behavior={"position"}
        contentContainerStyle={s.container}
        keyboardVerticalOffset={64}
        style={s.container}
      >
        <FlatList
          inverted
          data={chatGroup.messages}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          ListEmptyComponent={<View />}
          ref={ref => (this.flatList = ref)}
          // onEndReached={this.onEndReached}
        />
        <MessageInput
          groupId={chatGroup.id}
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

const mapStateToProps = ({ AuthReducer }) => ({
  AuthReducer
});

export default compose(
  connect(mapStateToProps),
  withTheme
)(MessengerView);
