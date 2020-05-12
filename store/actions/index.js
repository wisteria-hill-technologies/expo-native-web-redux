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

      const response = await fetch(
        `${API_URL}/signup`,
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

      const response = await fetch(
        `${API_URL}/signin`,
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

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: TYPES.LOGOUT
    });
  }
};

export const getAllCategories = () => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${API_URL}/categories`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
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
        type: TYPES.GET_ALL_CATEGORIES,
        allCategories: resData
      });
    } catch (err) {
      if (err.message === "Unauthorized") {
        logout();
      }
    }
  };
};

export const getToplevelCategories = () => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${API_URL}/categories/toplevel`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
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
        type: TYPES.GET_TOPLEVEL_CATEGORIES,
        categories: resData
      });
    } catch (err) {
      if (err.message === "Unauthorized") {
        logout();
      }
    }
  };
};

export const getCategory = ({ id }) => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(
        `${API_URL}/categories/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
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
        type: TYPES.SELECT_CATEGORY,
        selectedCategory: resData
      });
    } catch (err) {
      if (err.message === "Unauthorized") {
        logout();
      }
    }
  };
};

export const addNewCategory = ({ label, parent_cat_id }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const raw = JSON.stringify({ label, parent_cat_id });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: raw
      };

      const response = await fetch(
        `${API_URL}/categories`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const resData = await response.json();

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      dispatch({
        type: TYPES.ADD_NEW_CATEGORY,
        category: resData
      });
    } catch (err) {
      throw err;
    }
  };
};

export const editCategory = ({ id, label, parent_cat_id }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const raw = JSON.stringify({ id, label, parent_cat_id });

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: raw
      };

      const response = await fetch(
        `${API_URL}/categories`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const resData = await response.json();

      if (resData.error || resData.errors && resData.errors.length > 0) {
        throw new Error("Something went wrong.");
      }

      dispatch({
        type: TYPES.EDIT_CATEGORY,
        category: resData
      });
    } catch (err) {
      throw err;
    }
  };
};
