import React, { useEffect } from 'react';
import {StyleSheet} from "react-native";
import { Card } from 'react-native-paper';
import {Text} from "../theme/Typography";
import { selectColor } from '../theme/utils';
import * as Speech from 'expo-speech';

const MessageBox = ({ message, state, speak }) => {
  useEffect(() => {
    if (message) Speech.speak(message);
  }, [message]);

  return (
    <Card style={[{ backgroundColor: selectColor(state) }, styles.card]}>
      <Card.Content>
        <Text>{message}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10
  }
});

export default MessageBox;
