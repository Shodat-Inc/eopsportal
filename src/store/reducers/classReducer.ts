import { CLASS_ERROR, CLASS_LOADING, CLASS_SUCCESS } from "../types";

const initialState = {
  selectedClass:'',
};

const classReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case CLASS_SUCCESS:
      return {
        ...state,
        selectedClass: action.payload,
      };

    case CLASS_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export default classReducer;