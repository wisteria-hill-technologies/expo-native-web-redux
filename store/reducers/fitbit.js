import * as TYPES from '../actions/types';

const initialState = {
  dailyActivitySummaries: null,
  dailyHeartRateSummaries: null,
  fitbitAccessToken: '',
  authenticated: false
};

const fitbitReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_FITBIT_ACCESS_TOKEN:
      return { ...state, fitbitAccessToken: action.fitbitAccessToken, authenticated: true };

    case TYPES.GET_FITBIT_DAILY_ACTIVITY_SUMMARY:
      return {
        ...state,
        dailyActivitySummaries: {
          ...state.dailyActivitySummaries,
          ...action.dailyActivitySummary
        }
      }

    case TYPES.GET_FITBIT_DAILY_HEARTRATE_SUMMARY:
      return {
        ...state,
        dailyHeartRateSummaries: {
          ...state.dailyHeartRateSummaries,
          ...action.dailyHeartRateSummary
        }
      }

    default:
      return state;
  }
};

export default fitbitReducer;
