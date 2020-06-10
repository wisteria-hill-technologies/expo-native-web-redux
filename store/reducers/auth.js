import * as TYPES from '../actions/types';

const initialState = {
  authenticated: true,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlhdCI6MTU5MTc5MjYxNzkwNSwiYWRtaW50eXBlIjowLCJ1c2VydHlwZSI6MX0.2oBzZJKt_MRvXKkyNXAYvVwx2_hlR0ymjCgjeUMf0w8'
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case TYPES.SIGN_UP:
      if (action.token) {
        return { authenticated: true, token: action.token };
      }
      return { authenticated: false, token: '' };

    case TYPES.LOGIN:
      if (action.token) {
        return { authenticated: true, token: action.token };
      }
      return { authenticated: false, token: '' };

    case TYPES.LOGOUT:
      return { authenticated: false, token: '' };

    default:
      return state;
  }
};

export default authReducer;
