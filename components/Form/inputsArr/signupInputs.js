import { lowerCasePattern, emailPattern } from '../validationPatterns';

const signupInputs = [
  {
    type: "text", name: "username", label: "username",
    validationOptions: {
      required: { value: true, errorMessage: 'Username is required.' },
      minLength: { value: 6, errorMessage: 'Username should not be less than 6 characters long.' },
      maxLength: { value: 20, errorMessage: 'Username should not be more than 20 characters long.' },
      pattern: { value: lowerCasePattern, errorMessage: 'Please use lower case characters without spaces for username.'} // lower case only
    }
  },
  {
    type: "email", name: "email", label: "email", keyboardType: "email-address",
    validationOptions: {
      required: { value: true, errorMessage: 'Email is required.' },
      pattern: { value: emailPattern, errorMessage: 'Please enter a valid email address.' }
    }
  },
  {
    type: "password", name: "password", label: "password", secureTextEntry: true,
    validationOptions: {
      required: { value: true, errorMessage: 'Password is required.' },
      minLength: { value: 8, errorMessage: 'Password should not be less than 8 characters long.' },
      maxLength: { value: 30, errorMessage: 'Password should not be more than 30 characters long.' },
    }
  }
];

export default signupInputs;
