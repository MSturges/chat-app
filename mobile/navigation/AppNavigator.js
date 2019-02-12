import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

// hotels stack
import Hotels from "../screens/Hotels";
// settings stack
import Settings from "../screens/Settings";

const AppNavigator = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Stack key="hotels">
          <Scene key="hotels" component={Hotels} title="Hotels" />
        </Stack>
        <Stack key="settings">
          <Scene key="settings" component={Settings} title="Reservations" />
        </Stack>
      </Scene>
    </Router>
  );
};

export default AppNavigator;
