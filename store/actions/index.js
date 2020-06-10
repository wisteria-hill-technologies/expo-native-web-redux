import { API_URL } from 'react-native-dotenv';
import * as TYPES from './types';

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

      dispatch({
        type: TYPES.SIGN_UP,
        token
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

      dispatch({
        type: TYPES.LOGIN,
        token
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

export const getFitbitDailyActivitySummary = (specifiedDateStr) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
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
