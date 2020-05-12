import React from 'react';
import {StyleSheet} from "react-native";
import { Card } from 'react-native-paper';
import {Text} from "../theme/Typography";
import { selectColor } from '../theme/utils';



const MessageBox = ({ message, state }) => {
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
