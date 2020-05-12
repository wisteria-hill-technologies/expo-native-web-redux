import * as TYPES from '../actions/types';

const initialState = {
  authenticated: true,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE4LCJpYXQiOjE1ODkyNzY1NzYyNTcsImFkbWludHlwZSI6MCwidXNlcnR5cGUiOjF9.dTT05HodfmkVi7wMZATg9j_cUCcEpT45hR27Wooqy3Q'
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case TYPES.SIGN_UP:
      if (action.token) {
        return { authenticated: true, token: action.token };
      }
      return { authenticated: false, token: "" };
    case TYPES.LOGIN:
      if (action.token) {
        return { authenticated: true, token: action.token };
      }
      return { authenticated: false, token: "" };

    case TYPES.LOGOUT:
      return { authenticated: false, token: "" };

    default:
      return state;
  }
};

export default authReducer;
