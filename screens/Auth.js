import React, { useReducer, useState, useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import Form from '../components/Form';
import { BigTitle  } from "../theme/Typography";
import { login, signUp } from '../store/actions';
import loginInputs from "../components/Form/inputsArr/loginInputs";
import signupInputs from "../components/Form/inputsArr/signupInputs";
import routeTitleMapper from "../components/Routes/routeTitleMapper";

const Auth = ({ history }) => {
  const { pathname } = history.location || {};
  const { name } = routeTitleMapper(pathname) || {};

  const inputsArr = name === 'login' ? loginInputs : signupInputs;
  const initialInputValuesAndValidities = inputsArr.reduce((acc, obj) => {
    acc.inputValues[obj.name] = "";
    acc.inputValidities[obj.name] = {
      isValid: false,
      message: ''
    };
    return acc;
  }, { inputValues: {}, inputValidities: {}});
  const initialFormState = {
    ...initialInputValuesAndValidities,
    formIsValid: false
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.titleWrapper}>
          <BigTitle>OUR ITEMS</BigTitle>
        </View>
        <Form
          inputsArr={inputsArr}
          initialFormState={initialFormState}
          pathname={pathname}
          name={name}
          confirmBtn={{
            title: name === 'login' ? 'Log In' : 'Sign Up',
            actionCreator: name === 'login' ? login : signUp,
          }}
          alternativeBtn={{
            title: name === 'login' ? 'Sign Up' : 'Log In',
            link: name === 'login' ? '/signup' : '/',
          }}
          successMessage={name === 'login' ? 'Login Successful' : 'Sign Up Successful'}
          failureMessage={name === 'login' ? 'Unable to login. Please check your details.' : 'Unable to sign up.  Please check your details.'}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    // flex: 1,
    paddingVertical: 150,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default Auth;
