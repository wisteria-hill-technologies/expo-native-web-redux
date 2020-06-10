import { combineReducers } from 'redux';
import fitbitReducer from './fitbit';
import authReducer from './auth';

const rootReducer = combineReducers({
  fitbit: fitbitReducer,
  auth: authReducer
});

export default rootReducer;
