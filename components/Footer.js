import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FooterText } from '../theme/Typography';
import { useHistory } from '../Router';
import routeTitleMapper from "./Routes/routeTitleMapper";
import { useDispatch } from "react-redux";
import { logout } from '../store/actions';

const Footer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, name, routeType } = routeTitleMapper(history.location.pathname);
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddCategory = () => {
    history.push('/category/new');
  };

  const handleEditCategory = () => {
    const id = history.location.pathname.replace('/category/', '');
    history.push(`/category/edit/${id}`);
  };

  const handleGoBack = () => {
    if (name === 'category') {
      history.push('/categories');
    } else {
      history.goBack();
    }
  };

  return (
    <Appbar style={styles.bottom}>
      <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'space-evenly', alignItems: 'center' }}>
        {
          ['category', 'categoryNew', 'categoryEdit'].includes(name) && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Appbar.Action icon="arrow-left" color="white" onPress={handleGoBack}/>
              <FooterText>Back</FooterText>
            </View>
          )
        }
        {
          name === 'categories' && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Appbar.Action icon="plus" color="white" onPress={handleAddCategory}/>
              <FooterText>Add Category</FooterText>
            </View>
          )
        }
        {
          name === 'category' && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Appbar.Action icon="plus" color="white" onPress={handleEditCategory}/>
              <FooterText>Edit Category</FooterText>
            </View>
          )
        }
        {
          routeType === 'private' && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Appbar.Action icon="logout" color="white" onPress={handleLogout}/>
              <FooterText>Log Out</FooterText>
            </View>
          )
        }
      </View>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
});

export default Footer;
