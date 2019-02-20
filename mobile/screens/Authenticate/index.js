import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { graphql, compose } from "react-apollo";
import { Actions } from "react-native-router-flux";

import { withAuth } from "../../contexts/AuthContext";
import SIGNUP_MUTATION from "../../graphql/mutations/signup-mutation";
import LOGIN_MUTATION from "../../graphql/mutations/login-mutation";

class Authenticate extends Component {
  static navigationOptions = {
    title: "Chat-App",
    headerLeft: null
  };
  state = {
    view: "login",
    email: "max@gmail.com",
    password: "password"
  };

  capitalizeFirstLetter = string => {
    return string[0].toUpperCase() + string.slice(1);
  };

  login = () => {
    const { email, password } = this.state;
    const { setUser } = this.props.auth;

    this.setState({
      loading: true
    });
    this.props
      .login({ email, password })
      .then(({ data: { login: user } }) => {
        setUser(user);
        this.setState({
          loading: false
        });
        Actions.groups();
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        Alert.alert(
          `${capitalizeFirstLetter(this.state.view)} error`,
          error.message,
          [
            { text: "OK", onPress: () => console.log("OK pressed") },
            {
              text: "Forgot password",
              onPress: () => console.log("Forgot Pressed"),
              style: "cancel"
            }
          ]
        );
      });
  };

  signup = () => {
    const { setUser } = this.props.auth;

    this.setState({
      loading: true
    });
    const { email, password } = this.state;
    this.props
      .signup({ email, password })
      .then(({ data: { signup: user } }) => {
        setUser(user);
        this.setState({
          loading: false
        });
        Actions.groups();
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        Alert.alert(
          `${capitalizeFirstLetter(this.state.view)} error`,
          error.message,
          [{ text: "OK", onPress: () => console.log("OK pressed") }] // eslint-disable-line no-console
        );
      });
  };

  switchView = () => {
    this.setState({
      view: this.state.view === "signup" ? "login" : "signup"
    });
  };

  render() {
    const { view } = this.state;
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          undefined
        )}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder={"Email"}
            value={this.state.email}
            style={styles.input}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            value={this.state.password}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Button
          onPress={this[view]}
          style={styles.submit}
          title={view === "signup" ? "Sign up" : "Login"}
          disabled={this.state.loading}
        />
        <View style={styles.switchContainer}>
          <Text>
            {view === "signup"
              ? "Already have an account?"
              : "Hey akunua, click here =>"}
          </Text>
          <TouchableOpacity onPress={this.switchView}>
            <Text style={styles.switchAction}>
              {view === "login" ? "Sign up" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    paddingHorizontal: 50
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginVertical: 6,
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12
  },
  switchAction: {
    paddingHorizontal: 4,
    color: "blue"
  },
  submit: {
    marginVertical: 6
  }
});

const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) =>
      mutate({
        variables: { email, password }
      })
  })
});
const signup = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: ({ email, password }) =>
      mutate({
        variables: { email, password }
      })
  })
});
export default compose(
  withAuth,
  login,
  signup
)(Authenticate);
