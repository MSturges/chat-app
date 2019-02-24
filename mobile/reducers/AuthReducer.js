import { REHYDRATE } from "redux-persist";
import Immutable from "seamless-immutable";

export const LOGOUT = "LOGOUT";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

const initialState = Immutable({
  loading: true
});

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      const { payload = {} } = action;
      return Immutable(payload.auth || state).set("loading", false);
    case SET_CURRENT_USER:
      return state.merge(action.user);
    case LOGOUT:
      return Immutable({ loading: false });
    default:
      return state;
  }
};

export default AuthReducer;
