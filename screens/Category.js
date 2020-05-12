import React, { useEffect } from 'react';
import {View, StyleSheet, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { BigTitle, Title, Text } from '../theme/Typography';
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../store/actions";
import SwipeCarousel from "../components/SwipeCarousel";

const Category = ({ history, match }) => {
  const { id } = match.params || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const allCategories = useSelector(state => state.categories.allCategories) || [];
  const category = allCategories.find(item => `${item.cat_id}` === id);

  const { cat_id, label, parent_cat_id } = category || {};
  const parentCategory = allCategories.find(item => item.cat_id === parent_cat_id) || {};
  const childCategories = allCategories.filter(item => item.parent_cat_id === cat_id);

  return(
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'center', width: '100%', paddingBottom: 50, alignItems: 'center' }}>
        <View style={styles.screen}>
          <View style={styles.titleWrapper}>
            <Text>{parentCategory && !!parentCategory.label ? `Parent Category: ${parentCategory.label}` : "Top Level Category"  }</Text>
          </View>
          <View style={styles.titleWrapper}>
            <BigTitle>{label}</BigTitle>
          </View>
          <View style={styles.titleWrapper}>
            <Title>Child Categories</Title>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%', height: 300 }}>
            {
              childCategories.length > 0 ? (
                <SwipeCarousel items={childCategories} history={history} small />
              ) : (
                <View>
                  <Text>No Child Categories Yet</Text>
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  titleWrapper: {
    padding: 15
  }
});

export default Category;
