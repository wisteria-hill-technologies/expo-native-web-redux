import React, { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View } from 'react-native';
import { Text } from "../../theme/Typography";
import { TextInput as PaperTextInput } from 'react-native-paper';

const TextInput = ({ name, label, value, onChangeText, validity, validate, ...props }) => {
  useEffect(() => {
    if(validate) {
      onChangeText(value, name);
    }
  }, [validate]);
  const { isValid, message } = validity || {};
  const error = !isValid && !!message;
  return (
    <View style={styles.inputOuter}>
      <PaperTextInput
        label={label}
        onBlur={() => onChangeText(value, name)}
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
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  },
  error: { color: "red" }
});

export default TextInput;
