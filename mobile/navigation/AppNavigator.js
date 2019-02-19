import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

// hotels stack
import Groups from "../screens/Groups";
// messages stack
import Messenger from "../screens/Messenger";
// settings stack
import Settings from "../screens/Settings";
// auth stack
import Auth from "../screens/Auth";

const AppNavigator = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Stack key="Groups">
          <Scene key="groups" component={Groups} title="Group Chat" />
          <Scene key="messenger" component={Messenger} title="Messenger" />
          <Scene key="settings" component={Settings} title="Settings" />
          <Scene key="auth" component={Auth} title="auth" initial />
        </Stack>
      </Scene>
    </Router>
  );
};

export default AppNavigator;
