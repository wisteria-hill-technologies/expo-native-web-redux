import React, { useEffect }  from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, Prompt } from 'expo-auth-session';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Button from './Button';
import { API_URL, REDIRECT_URI } from 'react-native-dotenv';
import * as Speech from 'expo-speech';
import {useSelector, useDispatch } from "react-redux";
import { setFitbitAccessToken } from "../store/actions";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
  revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
};

const FitbitAuth = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth) || {};

  useEffect(() => {
    Speech.speak('Would you like to access Fitbit?  We will collect your anonymized data for medical research purpose.')
  }, []);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '22BMHR',
      scopes: ['activity', 'sleep', 'profile'],
      // For usage in managed apps using the proxy
      redirectUri: REDIRECT_URI,
      prompt: Prompt.Consent
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const fitbitTokenUrl = `${API_URL}/fitbit_token`;
      const { code } = response.params;
      fetch(fitbitTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(response => {
          const { access_token } = (response && response.result) || {};
          dispatch(setFitbitAccessToken(access_token));

        })
        .catch(err => {
          console.log('fetch error >>>>', err);
        })
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        icon="link"
        mode="contained"
        onPress={() => {
          promptAsync();
        }}
        accesibilityLabel="Connect Fitbit"
      >
        Connect Fitbit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FitbitAuth;
