import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import authReducer from "./auth";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  auth: authReducer
});

export default rootReducer;
