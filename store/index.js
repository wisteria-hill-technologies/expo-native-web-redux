import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(reduxThunk)
)(createStore);

const store = finalCreateStore(reducers);

export default store;