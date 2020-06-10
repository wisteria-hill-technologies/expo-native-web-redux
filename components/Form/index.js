import React, { useReducer, useState, useEffect } from "react";
import { View, StyleSheet, Picker } from "react-native";
import ActivityIndicator from '../ActivityIndicator';
import TextInput from "../TextInput";
import Button from "../Button";
import { useDispatch } from "react-redux";
import checkError from './checkError';
import MessageBox from "../MessageBox";
import { FORM_UPDATE, FORM_RESET } from './actionTypes';
import formReducer from './formReducer';
import { useHistory } from '../../Router';

const Form = ({ id, inputsArr, initialFormState, fieldsValidationOptions, confirmBtn, alternativeBtn, successMessage, failureMessage, speak, successCallback }) => {
  const history = useHistory();
  const [ validateForm, setValidateForm ] = useState(false);
  const defaultFormStatus = { hasError: false, message: '' };
  const [ formStatus, setFormStatus ] = useState(defaultFormStatus);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormAction] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setValidateForm(false);
      setFormStatus(defaultFormStatus);
      dispatchFormAction({ type: FORM_RESET, initialFormState });
    }
    return () => mounted = false;
  }, [initialFormState]);

  const textChangeHandler = (text, name, type) => {
    let validityStatus = checkError(text, name, type, fieldsValidationOptions[name]);
    dispatchFormAction({ type: FORM_UPDATE, name, value: text, validityStatus: {
      isValid: true,
        message: ''
    }});
  };

  const onBlurHandler = (text, name, type) => {
    let validityStatus = checkError(text, name, type, fieldsValidationOptions[name]);
    dispatchFormAction({ type: FORM_UPDATE, name, value: text, validityStatus });
  };

  const handleSubmit = async () => {
    if(!formState.formIsValid) {
      setValidateForm(true);
      setFormStatus({ hasError: true, message: 'Please check your details again.'});
    } else {
      setLoading(true);
      setFormStatus({ hasError: false, message: successMessage });
      try {
        const dispatchParams = inputsArr.reduce((acc, inputObj) => {
          return { ...acc, [inputObj.name]: formState.inputValues[inputObj.name] || null };
        }, {});

        if (id) {
          dispatchParams.id =id;
        }
        dispatch(confirmBtn.actionCreator(dispatchParams));
        setLoading(false);
        successCallback && successCallback();
      } catch (err) {
        setLoading(false);
        setFormStatus({ hasError: true, message: failureMessage });
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.inputs}>
      <View style={{ flex: 1 }}>
        {
          inputsArr.map(({ name, label, keyboardType, secureTextEntry, type, pickerList }) => {
            if (type === 'picker' && pickerList) {
              return (
                <Picker
                  key={name}
                  selectedValue={formState.inputValues[name] || ''}
                  style={{ margin: 10, height: 64 }}
                  onValueChange={(itemValue) => textChangeHandler(itemValue, name, type)}
                >
                  {
                    pickerList && pickerList.map(({ name, label, cat_id }) => (
                      <Picker.Item key={cat_id} label={label} value={cat_id} />
                    ))
                  }
                </Picker>
              );
            } else {
              return (
                <TextInput
                  speak={speak}
                  key={name}
                  name={name}
                  label={label}
                  value={formState.inputValues[name] || ''}
                  onChangeText={text => textChangeHandler(text, name, type)}
                  onBlur={text => onBlurHandler(text, name, type)}
                  validity={formState.inputValidities[name]}
                  validate={validateForm}
                  autoCapitalize="none"
                  keyboardType={keyboardType || 'default'}
                  secureTextEntry={secureTextEntry}
                />
              );
            }
          })
        }
        {
          !!formStatus.message && (
            <MessageBox
              speak={speak}
              style={{ flex: 1 }}
              state={formStatus.hasError ? "danger" : "success"}
              message={formStatus.message}
            />
          )
        }

      </View>
      <View style={{ flex: 1 }}>
        <Button
          icon="login-variant"
          mode="contained"
          onPress={handleSubmit}
          accesibilityLabel={confirmBtn.title}
        >
          {confirmBtn.title}
        </Button>
        {
          alternativeBtn && alternativeBtn.title && (
            <Button
              mode="outlined"
              onPress={() => history.push(alternativeBtn.link)}
              accesibilityLabel={alternativeBtn.title}
            >
              {alternativeBtn.title}
            </Button>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    width: "90%",
    maxWidth: 500,
  },
});

export default Form;
