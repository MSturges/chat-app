import React, { createContext, Component } from "react";
import { AsyncStorage } from "react-native";

// primaryOne = main background of a screen
// primaryTwo = content background (card, list)
// primaryThree = headers for filtering

const themes = {
  light: {
    // Primary colors
    primaryOne: "#ECEFF1",
    primaryTwo: "#FFFFFF",
    primaryThree: "rgb(240, 240, 250)",
    // Frequently used
    // fontPrimary: '#000000', < ---animations work with rgb and rgba
    fontPrimary: "rgb(0,0,0)",
    fontSecondary: "#494949",

    borderPrimary: "#979797",
    // -------------------
    // Specific components
    // -------------------
    // Layout Footer
    footerTopBorder: "#000000",
    footerBackground: "#FFFFFF",
    footerText: "#000000",
    footerIcon: "#000000"
  },
  dark: {
    // Primary colors
    primaryOne: "#0D1B26",
    // primaryOne: '#040D20',
    primaryTwo: "#1E2734",
    primaryThree: "#0D1B26",
    // primaryFour: '#0D1B26', <--- looks kinda good
    // Frequently used
    // fontPrimary: '#FFFFFF', <---animations work with rgb and rgba
    fontPrimary: "rgb(255,255,255)",

    fontSecondary: "#D8D8D8",
    borderPrimary: "#030D20",
    // -------------------
    // Specific components
    // -------------------
    // Layout Footer
    footerTopBorder: "#FFFFFF",
    footerBackground: "#030C1D",
    footerText: "#FFFFFF",
    footerIcon: "#FFFFFF"
  },
  // Might not need all of these colors *
  default: {
    green: "#18C683",
    // rgb(24,198,131)
    // red: '#f44336',
    red: "rgb(244, 67, 54)",
    blue: "#64b5f6",
    gray: "#ECEFF1",
    black: "#000000",
    white: "#FFF"
  }
};

const ThemeContext = createContext();

export class ThemeProvider extends Component {
  state = {
    ...themes["light"],
    ...themes.default,
    selectedTheme: "light"
  };

  async componentDidMount() {
    try {
      const StoredTheme = AsyncStorage.getItem("THEME");

      if (StoredTheme === "dark") {
        return this.setState({ theme: "dark" });
      }
    } catch (err) {}
  }

  toggleTheme = async () => {
    const newTheme = this.state.selectedTheme === "light" ? "dark" : "light";
    try {
      await AsyncStorage.setItem("THEME", newTheme);
      this.setState({
        ...themes[newTheme],
        ...themes.default,
        selectedTheme: newTheme
      });
    } catch (err) {}
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          toggleTheme: this.toggleTheme
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export function withTheme(Component) {
  return props => (
    <ThemeContext.Consumer>
      {theme => <Component {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

export default ThemeContext;
