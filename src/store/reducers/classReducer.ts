import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";

const initialState = {
  selectedClass: '',
  toggleAddObject: false,
  getAllClass: [],
  classBreadcrumbs:{}
};

const classReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CLASS_SUCCESS:
      return {
        ...state,
        selectedClass: action.payload,
      };

    case SET_CLASS_ERROR:
      return {
        error: action.payload,
      };

    case TOGGLE_ADD_OBJECT_MODEL_SUCCESS:
      return {
        ...state,
        toggleAddObject: action.payload,
      };

    case TOGGLE_ADD_OBJECT_MODEL_ERROR:
      return {
        error: action.payload,
      };

    case GET_ALL_CLASS_SUCCESS:
      return {
        ...state,
        getAllClass: action.payload,
      };

    case GET_ALL_CLASS_ERROR:
      return {
        getAllClass: action.payload,
      };

      case BREADCRUMB_SUCCESS:
      return {
        ...state,
        classBreadcrumbs: action.payload,
      };

    case BREADCRUMB_ERROR:
      return {
        classBreadcrumbs: action.payload,
      };

    default:
      return state;
  }
};

export default classReducer;