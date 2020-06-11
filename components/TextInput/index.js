import React, { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View } from 'react-native';
import { Text } from "../../theme/Typography";
import { TextInput as PaperTextInput } from 'react-native-paper';
import * as Speech from 'expo-speech';

const TextInput = ({ name, label, value, onChangeText, onBlur, validity, validate, speak, ...props }) => {
  useEffect(() => {
    if(validate) {
      onBlur(value, name);
    }
  }, [validate]);
  const { isValid, message } = validity || {};
  const error = !isValid && !!message;

  useEffect(() => {
      if(message) Speech.speak(message);
  }, [message]);

  return (
    <View style={styles.inputOuter}>
      <PaperTextInput
        label={label}
        onBlur={() => onBlur(value)}
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
        { ...props }
      />
      <View>
        {!!error && <Text style={styles.error}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputOuter: {
    margin: 10
  },
  input: {
    fontWeight: Platform.OS === 'web' ? 'bold' : 'bold'
  },
  error: { color: "red" }
});

export default TextInput;
