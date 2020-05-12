import React from 'react';
import {useSelector} from 'react-redux';
import { Route, Redirect } from '../../Router';

const PrivateRoute = (props) => {
  const { authenticated } = useSelector(state => state.auth) || {};
  if (authenticated) {
    return <Route { ...props } />;
  } else {
    return <Redirect exact to="/" />;
  }
};

export default PrivateRoute;
