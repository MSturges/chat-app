import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

// hotels stack
import Groups from "../screens/Groups";
// messages stack
import Messenger from "../screens/Messenger";
// settings stack
import Settings from "../screens/Settings";

const AppNavigator = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Stack key="Groups">
          <Scene key="groups" component={Groups} title="Groups" />
          <Scene key="messenger" component={Messenger} title="Messenger" />
          <Scene key="settings" component={Settings} title="Reservations" />
        </Stack>
      </Scene>
    </Router>
  );
};

export default AppNavigator;
