import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import Routes from './components/Routes';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <ReduxProvider store={store} >
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </ReduxProvider>
  );
}
