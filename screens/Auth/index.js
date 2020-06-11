import React, { useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import Form from '../../components/Form';
import { BigTitle  } from "../../theme/Typography";
import { login, signUp } from '../../store/actions';
import loginInputs from "../../components/Form/inputsArr/loginInputs";
import signupInputs from "../../components/Form/inputsArr/signupInputs";
import routeTitleMapper from "../../components/Routes/routeTitleMapper";
import * as Speech from 'expo-speech';

const Auth = ({ history }) => {
  const { pathname } = history.location || {};
  const { name, title } = routeTitleMapper(pathname) || {};

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
  const fieldsValidationOptions = inputsArr.reduce((acc, fieldObj) => {
    const { name, validationOptions } = fieldObj || {};
    if(validationOptions) {
      acc[name] = validationOptions;
    }
    return acc;
  }, {});

  useEffect(() => {
    let mounted = true;
    if (mounted) Speech.speak(`You are on ${title} page.`);
    return () => mounted = false;
  },[title]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleWrapper}>
          <BigTitle>My Health</BigTitle>
        </View>
        <Form
          speak
          inputsArr={inputsArr}
          initialFormState={initialFormState}
          fieldsValidationOptions={fieldsValidationOptions}
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
          successMessage={name === 'login' ? 'Logging in' : 'Signing up'}
          failureMessage={name === 'login' ? 'Unable to login. Please check your details.' : 'Unable to sign up.  Please check your details.'}
          successCallback={
            () => {
              setTimeout(() => {
                Speech.speak('You are logged in!');
              });
            }
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  scrollView: {flexGrow: 1, alignItems: 'center'},
  titleWrapper: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default Auth;
