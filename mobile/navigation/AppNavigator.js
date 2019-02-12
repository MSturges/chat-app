import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";

// hotels stack
import Hotels from "../screens/Hotels";
import HotelRooms from "../screens/HotelRooms";
import CreateReservation from "../screens/CreateReservation";
// reservation stack
import Reservations from "../screens/Reservations";
// settings stack
import Settings from "../screens/Settings";

const AppNavigator = props => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Stack key="hotels">
          <Scene key="hotels" component={Hotels} title="Hotels" />
          <Scene
            back
            key="hotelRooms"
            component={HotelRooms}
            title={props.title}
          />
          <Scene
            back
            key="createReservation"
            component={CreateReservation}
            title="Make Reservation"
            roomData={props.roomData}
          />
        </Stack>
        <Stack key="reservations">
          <Scene
            key="reservations"
            component={Reservations}
            title="Reservations"
          />
        </Stack>
        <Stack key="settings">
          <Scene key="settings" component={Settings} title="Reservations" />
        </Stack>
      </Scene>
    </Router>
  );
};

export default AppNavigator;
