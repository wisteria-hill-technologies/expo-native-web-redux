import React from "react";
import {
  StyleSheet, View
} from "react-native";
import Header from '../Header';
import Footer from '../Footer';
import Auth from '../../screens/Auth';
import Categories from '../../screens/Categories';
import CategoryFormScreen from '../../screens/CategoryFormScreen';
import Category from '../../screens/Category';
import { Router, Switch, Redirect } from '../../Router';
import PrivateRoute from "./PrivateRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

const Routes = () => {
  return (
    <Router>
        <Header />
        <View style={styles.screen}>
          <Switch>
            <PrivateRoute exact path="/categories" component={Categories} />
            <PrivateRoute exact path="/category/new" component={CategoryFormScreen} />
            <PrivateRoute exact path="/category/edit/:id" component={CategoryFormScreen} />
            <PrivateRoute exact path="/category/:id" component={Category} />
            <PublicOnlyRoute exact path="/signup" component={Auth} />
            <PublicOnlyRoute exact path="/" component={Auth} />
            <Redirect to="/" />
          </Switch>
        </View>
        <Footer />
      </Router>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default Routes;
