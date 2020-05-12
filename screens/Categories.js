import React, { useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView} from "react-native";
import { Title, Text } from "../theme/Typography";
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getToplevelCategories } from '../store/actions';
import SwipeCarousel from '../components/SwipeCarousel';

const Categories = ({ history }) => {
  const topLevelCategories = useSelector(state => state.categories.categories) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToplevelCategories());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'center', width: '100%', paddingBottom: 50, paddingHorizontal: 30 }}>
        {
          topLevelCategories.length > 0 ? (
            <SwipeCarousel items={topLevelCategories} history={history} />
          ) : (
            <View>
              <Text>No Categories</Text>
            </View>
          )
        }
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
    alignItems: "center",
    overflow: 'hidden'
  },
  swiperContainer: {
    flex: 1
  }
});

export default Categories;
