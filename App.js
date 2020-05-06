import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [ outputText, setOutputText ] = useState('Change text');
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <Button
        title={outputText}
        onPress={() => setOutputText('You pressed!')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
