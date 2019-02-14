import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { FRAGMENT } from "./Message";
import { withTheme } from "../../contexts/ThemeContext";
import { Button } from "../../components/common";

class MessageInput extends Component {
  state = {
    text: ""
  };

  send = createMessage => {
    const { groupId, userId } = this.props;

    createMessage({
      variables: {
        text: this.state.text,
        groupId: groupId,
        userId: userId
      }
    })
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log("error", err);
      });

    this.textInput.clear();
    this.textInput.blur();
  };

  render() {
    return (
      <Mutation mutation={CREATE_MESSAGE_MUTATION}>
        {createMessage => {
          return (
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref={ref => {
                    this.textInput = ref;
                  }}
                  onChangeText={text => this.setState({ text })}
                  style={styles.input}
                  value={this.state.text}
                  placeholder="Type your message here!"
                />
              </View>
              <View style={styles.sendButtonContainer}>
                <Button onPress={() => this.send(createMessage)} hover>
                  <MaterialCommunityIcons
                    name="hotel"
                    size={16}
                    color="white"
                  />
                </Button>
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($text: String!, $userId: Int!, $groupId: Int!) {
    createMessage(text: $text, userId: $userId, groupId: $groupId) {
      id
    }
  }
`;

const GROUP_QUERY = gql`
  query group($groupId: Int!) {
    group(id: $groupId) {
      id
      name
      users {
        id
        username
      }
      messages {
        id
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "#f5f1ee",
    borderColor: "#dbdbdb",
    borderTopWidth: 1,
    flexDirection: "row"
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  input: {
    backgroundColor: "white",
    borderColor: "#dbdbdb",
    borderRadius: 15,
    borderWidth: 1,
    color: "black",
    height: 32,
    paddingHorizontal: 8
  },
  sendButtonContainer: {
    paddingRight: 12,
    paddingVertical: 6
  },
  sendButton: {
    height: 32,
    width: 32
  }
});

export default withTheme(MessageInput);
