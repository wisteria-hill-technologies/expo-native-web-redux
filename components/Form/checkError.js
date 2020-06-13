const checkError = (value, name, type, validationOptions) => {
  if(!validationOptions) return {
    isValid: true,
    message: ''
  }
  const trimmedValue = (type === 'text' || type === 'textarea' || type === 'email' || type === 'password' || type === 'editor') ? value && value.trim() : value;
  const { required, minValue, maxValue, minLength, maxLength, pattern } = validationOptions || {};
  if(required && required.value && (!trimmedValue || trimmedValue.length < 1)) return {
    isValid: false,
    message: required.errorMessage
  };
  if (pattern && pattern.value && !pattern.value.test(trimmedValue)) return {
    isValid: false,
    message: pattern.errorMessage
  };
  if (type === 'number' || type === 'range') {
    if (minValue && (trimmedValue < minValue.value)) return {
      isValid: false,
      message: minValue.errorMessage
    };
    if (maxValue && (trimmedValue > maxValue.value)) return {
      isValid: false,
      message: maxValue.errorMessage
    };
  } else {
    if (minLength && (trimmedValue.length < minLength.value)) return {
      isValid: false,
      message: minLength.errorMessage
    };
    if (maxLength && (trimmedValue.length > maxLength.value)) return {
      isValid: false,
      message: maxLength.errorMessage
    };
  }
  return {
    isValid: true,
    message: ''
  };



  // if(
  //   name !== 'parent_cat_id'
  //   && (!value || (value.trim().length < 1))
  // ) {
  //   return {
  //     isValid: false,
  //     message: `Please enter ${name ? name : 'a value' }.`
  //   };
  // }
  // return {
  //   isValid: true,
  //   message: ''
  // }
};

export default checkError;
