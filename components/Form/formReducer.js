import {FORM_RESET, FORM_UPDATE} from './actionTypes';

const formReducer = (state, action) => {

  switch (action.type) {
    case FORM_RESET:
      return action.initialFormState;
    case FORM_UPDATE:
      const updatedInputValues = {
        ...state.inputValues,
        [action.name]: action.value
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.name]: action.validityStatus
      };
      let updatedFormIsValid =true;
      for (const key in updatedInputValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key].isValid;
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities
      };
    default:
      return state;
  }
};

export default formReducer;
