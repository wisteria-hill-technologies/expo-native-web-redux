import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

export const HeaderTitle = ({ children, ...props}) => (<PaperText { ...props } style={styles.headerTitle}>{children}</PaperText>);
export const FooterText = ({ children, ...props}) => (<PaperText { ...props } style={styles.footerText}>{children}</PaperText>);

export const BigTitle = ({ children, ...props}) => (<PaperText { ...props } style={styles.bigTitle}>{children}</PaperText>);

export const Title = ({ children, ...props}) => (<PaperText { ...props } style={styles.title}>{children}</PaperText>);

export const Text = ({ children, style, ...props}) => {
  return (<PaperText { ...props } style={[styles.text, style]}>{children}</PaperText>);
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  },
  footerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  },
  bigTitle: {
    fontSize: 35,
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  },
  title: {
    fontSize: 25,
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  },
  text: {
    fontSize: 20,
    fontWeight: Platform.OS === 'web' ? 'bold' : 'normal'
  }
});
