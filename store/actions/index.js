import { API_URL } from 'react-native-dotenv';
import * as TYPES from './types';
import checkForAnonymizer from '../utils/checkForAnonymizer';
import {AsyncStorage} from "react-native-web";

export const signUp = ({ username, email, password }) => {
  return async dispatch => {
    try {
      const raw = JSON.stringify({ username, email, password });

      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: raw
      };

      const uri = `${API_URL}/signup`;

      const response = await fetch(
        uri,
        requestOptions
      );

      if (!response.ok) {
          throw new Error("Something went wrong.");
      }

      const resData = await response.json();

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      const { token } = resData || {};

      await checkForAnonymizer(username);

      dispatch({
        type: TYPES.SIGN_UP,
        token,
        username
      });

    } catch (err) {
      throw err;
    }
  };
};

export const login = ({ username, password }) => {
  return async dispatch => {
    try {
      const raw = JSON.stringify({ username, password });
      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: raw
      };

      const uri = `${API_URL}/signin`;

      const response = await fetch(
        uri,
        requestOptions
      );


      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resData = await response.json();
      const { token } = resData || {};

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      await checkForAnonymizer(username);

      dispatch({
        type: TYPES.LOGIN,
        token,
        username
      });
    } catch (err) {
      throw err;
    }
  };
};

export const setFitbitAccessToken = (fitbitAccessToken) => {
  return {
    type: TYPES.SET_FITBIT_ACCESS_TOKEN,
    fitbitAccessToken
  }
};

const sendAnonymousUserData = async (username, date, data, token) => {
  const userAnonymizer = await checkForAnonymizer(username);
  const raw = JSON.stringify({ user: userAnonymizer, date, ...data });

  const requestOptionsUserD = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    body: raw
  };

  const userDataUri = `${API_URL}/userData`;

  const responseUserData = await fetch(
    userDataUri,
    requestOptionsUserD
  );

  if (!responseUserData.ok) {
    throw new Error(responseUserData.statusText);
  }
  if (resData.error || resData.errors && resData.errors.length > 0) {
    throw new Error("Something went wrong.");
  }
};

export const getFitbitDailyActivitySummary = (specifiedDateStr) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;
    const fitbitAccessToken = getState().fitbit.fitbitAccessToken;
    const today = new Date();
    const dateStr = specifiedDateStr ? specifiedDateStr : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    const uri = `https://api.fitbit.com/1/user/-/activities/date/${dateStr}.json`;

    try {
      const response = await fetch(
        uri,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fitbitAccessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resData = await response.json();

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      dispatch({
        type: TYPES.GET_FITBIT_DAILY_ACTIVITY_SUMMARY,
        dailyActivitySummary: {
          [dateStr]: resData
        }
      });

      await sendAnonymousUserData(username, dateStr, { dailyActivity: resData }, token);

    } catch (err) {
      if (err.message === "Unauthorized") {
        logout();
      }
    }
  };
}

export const getFitbitDailyHeartRateSummary = (specifiedDateStr, period="1d") => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;
    const fitbitAccessToken = getState().fitbit.fitbitAccessToken;
    const today = new Date();
    const dateStr = specifiedDateStr ? specifiedDateStr : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    const uri = `https://api.fitbit.com/1/user/-/activities/heart/date/${dateStr}/${period}.json`;

    try {
      const response = await fetch(
        uri,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fitbitAccessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resData = await response.json();

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      dispatch({
        type: TYPES.GET_FITBIT_DAILY_HEARTRATE_SUMMARY,
        dailyHeartRateSummary: {
          [dateStr]: resData
        }
      });

      await sendAnonymousUserData(username, dateStr, { dailyHeartRate: resData }, token);

    } catch (err) {
      if (err.message === "Unauthorized") {
        logout();
      }
    }
  };
}

export const logout = () => {
  return {
    type: TYPES.LOGOUT
  };
};
