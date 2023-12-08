import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR, TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";
import { CREATE_NEW_CLASS_ERROR, CREATE_NEW_CLASS_SUCCESS } from "../types";
import { CLASS_DELETE_MODAL_TOGGLE_ERROR, CLASS_DELETE_MODAL_TOGGLE_SUCCESS } from "../types";
import { SELECTED_CLASS_DATA_ERROR, SELECTED_CLASS_DATA_SUCCESS } from "../types";

const initialState = {
  selectedClass: '',
  toggleAddObject: false,
  toggleAddClassObject:false,
  getAllClass: [],
  classBreadcrumbs: {},
  createClassRes: {},
  toggleClassDeleteModal: false,
  selectedClassData:[]
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

      
      case TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS:
      return {
        ...state,
        toggleAddClassObject: action.payload,
      };

    case TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR:
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

    case CREATE_NEW_CLASS_SUCCESS:
      return {
        ...state,
        createClassRes: action.payload,
      };

    case CREATE_NEW_CLASS_ERROR:
      return {
        createClassRes: action.payload,
      };

    case CLASS_DELETE_MODAL_TOGGLE_SUCCESS:
      return {
        ...state,
        toggleClassDeleteModal: action.payload,
      };

    case CLASS_DELETE_MODAL_TOGGLE_ERROR:
      return {
        toggleClassDeleteModal: action.payload,
      };

      case SELECTED_CLASS_DATA_SUCCESS:
      return {
        ...state,
        selectedClassData: action.payload,
      };

    case SELECTED_CLASS_DATA_ERROR:
      return {
        selectedClassData: action.payload,
      };

    default:
      return state;
  }
};

export default classReducer;