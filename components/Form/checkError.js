const checkError = (value, name) => {
  if(
    name !== 'parent_cat_id'
    && (!value || (value.trim().length < 1))
  ) {
    return {
      isValid: false,
      message: `Please enter ${name ? name : 'a value' }.`
    };
  }
  return {
    isValid: true,
    message: ''
  }
};

export default checkError;
