import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { Button as PaperButton } from "react-native-paper";

const Button = ({ style, contentStyle, labelStyle, children, ...props }) => (
  <View style={styles.buttonWrapper}>
  <PaperButton
    style={styles.button}
    labelStyle={styles.buttonLabel}
    contentStyle={styles.buttonContent}
    { ...props }
  >
    {children}
  </PaperButton>
  </View>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 10,
  },
  buttonContent: {
    height: 50
  },
  buttonLabel: {
    fontWeight: Platform.OS === "web" ? "bold" : "normal",
  },
});

export default Button;
