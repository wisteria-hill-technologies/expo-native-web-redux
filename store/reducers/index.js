import { combineReducers } from 'redux';
import fitbitReducer from './fitbit';
import authReducer from './auth';
import * as TYPES from '../actions/types';

const appReducer = combineReducers({
  fitbit: fitbitReducer,
  auth: authReducer
});

const rootReducer = (state, action) => {
  if(action.type === TYPES.LOGOUT) {
    state = {}
  }
  return appReducer(state, action)
}

export default rootReducer;
