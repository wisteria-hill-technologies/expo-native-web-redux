import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { HeaderTitle } from '../theme/Typography';
import { useHistory } from '../Router';
import routeTitleMapper from "./Routes/routeTitleMapper";

const Header = () => {
  const history = useHistory();
  const { title, name, routeType } = routeTitleMapper(history.location.pathname);
  return (
    <Appbar.Header style={styles.header}>
      <HeaderTitle>{title}</HeaderTitle>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Header;
