import React, { createContext, Component } from "react";
import { AsyncStorage } from "react-native";

const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    id: "",
    jwt: "",
    username: "",
    userLoggedIn: false
  };

  setUser = async user => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      this.setState({
        id: user.id,
        jwt: user.jwt,
        username: user.username,
        userLoggedIn: true
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          setUser: this.setUser
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export function withAuth(Component) {
  return props => (
    <AuthContext.Consumer>
      {auth => <Component {...props} auth={auth} />}
    </AuthContext.Consumer>
  );
}

export default AuthContext;
