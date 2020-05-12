import React, { useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import Form from '../components/Form';
import {addNewCategory, editCategory, getAllCategories } from '../store/actions';
import categoryInputs from "../components/Form/inputsArr/categoryInputs";
import routeTitleMapper from "../components/Routes/routeTitleMapper";
import {useDispatch, useSelector} from "react-redux";
import checkError from "../components/Form/checkError";


const CategoryFormScreen = ({ history, match }) => {
  const { id } = match.params || {};
  const isEdit = !!id;
  const { pathname } = history.location || {};
  const { name } = routeTitleMapper(pathname) || {};

  const allCategories = useSelector(state => state.categories.allCategories) || [];
  const category = allCategories.find(item => `${item.cat_id}` === id);
  const dispatch = useDispatch();
  const allButNotSelfCategories = allCategories
    .filter(item => `${item.cat_id}` !== id);
  const firstItem = { name: 'null', label: 'No Parent Category', cat_id: null };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const inputsArr = categoryInputs
    .map(inputObj => {
      if (inputObj.type === 'picker') {
        inputObj.pickerList = [ firstItem, ...allButNotSelfCategories ];
      }
      return inputObj;
    })

  const initialInputValuesAndValidities = inputsArr.reduce((acc, obj) => {
    const { isValid, message } = category && checkError(category[obj.name], obj.name) || {};
    acc.inputValues[obj.name] = isEdit ? (category && category[obj.name]) : '';
    acc.inputValidities[obj.name] = {
      isValid: isEdit ? isValid : obj.name === 'parent_cat_id',
      message: ''
    };
    return acc;
  }, { inputValues: {}, inputValidities: {}});
  const initialFormState = {
    ...initialInputValuesAndValidities,
    formIsValid: !!isEdit
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Form
          id={id}
          inputsArr={inputsArr}
          initialFormState={initialFormState}
          pathname={pathname}
          name={name}
          confirmBtn={{
            title: 'Save',
            actionCreator: isEdit ? editCategory : addNewCategory,
          }}
          alternativeBtn={{
            title: 'Cancel',
            link: id ? `/category/${id}` : '/categories',
          }}
          successMessage="Saved!"
          returnPathOnSuccess={ id ? `/category/${id}` : '/'}
          failureMessage="Something went wrong. It did not save."
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50
  }
});

export default CategoryFormScreen;

