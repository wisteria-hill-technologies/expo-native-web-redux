import * as TYPES from '../actions/types';

const initialState = {
  allCategories: [],
  categories: [],
  selectedCategory: null
};

const categoriesReducer = (state=initialState, action) => {
  switch(action.type) {
    case TYPES.GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.allCategories
      };
    case TYPES.GET_TOPLEVEL_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    case TYPES.ADD_NEW_CATEGORY: {
      const newCategories = state.categories.filter(cat => cat.cat_id !== action.category.cat_id);
      return {
        ...state,
        categories: [...newCategories, action.category]
      };
    }
    case TYPES.EDIT_CATEGORY: {
      const newCategories = state.categories.filter(cat => cat.cat_id !== action.category.cat_id);
      return {
        ...state,
        categories: [...newCategories, action.category]
      };
    }
    case TYPES.SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.selectedCategory
      };
    }
    default:
      return state;
  }
};

export default categoriesReducer;
