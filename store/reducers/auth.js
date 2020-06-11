import * as TYPES from '../actions/types';

const initialState = {
  username: '',
  authenticated: false,
  token: ''
};

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case TYPES.SIGN_UP:
      if (action.token) {
        return { authenticated: true, token: action.token, username: action.username };
      }
      return { authenticated: false, token: '', username: '' };

    case TYPES.LOGIN:
      if (action.token) {
        return { authenticated: true, token: action.token, username: action.username };
      }
      return { authenticated: false, token: '' };

    case TYPES.LOGOUT:
      return { authenticated: false, token: '', username: '' };

    default:
      return state;
  }
};

export default authReducer;
