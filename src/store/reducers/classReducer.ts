import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";
import { TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR, TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS } from "../types";
import { OBJ_SELECT_DEFAULT_CLASS_ERROR, OBJ_SELECT_DEFAULT_CLASS_SUCCESS } from "../types";
import { OBJ_SELECT_DEFAULT_SUB_CLASS_ERROR, OBJ_SELECT_DEFAULT_SUB_CLASS_SUCCESS } from "../types";
import { SUCCESS_MESSAGE_ERROR, SUCCESS_MESSAGE_SUCCESS } from "../types";
import { DATA_FOR_EOPSWATCH_ERROR, DATA_FOR_EOPSWATCH_SUCCESS } from "../types";
import { EDIT_CLASS_MODEL_ERROR, EDIT_CLASS_MODEL_SUCCESS } from "../types";
import { EDIT_SUB_CLASS_MODEL_ERROR, EDIT_SUB_CLASS_MODEL_SUCCESS } from "../types";
import { EDIT_OBJECT_MODEL_ERROR, EDIT_OBJECT_MODEL_SUCCESS } from "../types";
import { EDIT_SUB_OBJECT_MODEL_ERROR, EDIT_SUB_OBJECT_MODEL_SUCCESS } from "../types";
import { NEW_CLASS_MODEL_ERROR, NEW_CLASS_MODEL_SUCCESS } from "../types";
import { SET_DATA_FOR_SUB_OBJECT_ERROR, SET_DATA_FOR_SUB_OBJECT_SUCCESS } from "../types";
import { SUCCESS_MESSAGE_WITH_TYPE_ERROR, SUCCESS_MESSAGE_WITH_TYPE_SUCCESS } from "../types";
import { SELECTED_CLASS_ERROR, SELECTED_CLASS_SUCCESS } from "../types";

const initialState = {
  selectedClass: '',
  toggleAddObject: false,
  getAllClass: [],
  classBreadcrumbs: {},
  toggleAddClassObject: false,
  objDefaultClassSelector: '',
  objDefaultSubClassSelector: '',
  successMessageReducer: false,
  successMessageAdvancedReducer: {
    "type":"",
    "action":false
  },
  dataforeopswatchReducer: {},
  editClassModalReducer: false,
  editSubClassModalReducer: false,
  editObjectModalReducer: false,
  editSubObjectModalReducer: false,
  newClassModalReducer: false,
  setDataForSubObjectReducer: {},
  selectedClassReducer:0
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

    case OBJ_SELECT_DEFAULT_CLASS_SUCCESS:
      return {
        ...state,
        objDefaultClassSelector: action.payload,
      };

    case OBJ_SELECT_DEFAULT_CLASS_ERROR:
      return {
        error: action.payload,
      };

    case OBJ_SELECT_DEFAULT_SUB_CLASS_SUCCESS:
      return {
        ...state,
        objDefaultSubClassSelector: action.payload,
      };

    case OBJ_SELECT_DEFAULT_SUB_CLASS_ERROR:
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
      }

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

    case SUCCESS_MESSAGE_SUCCESS:
      return {
        ...state,
        successMessageReducer: action.payload,
      };

    case SUCCESS_MESSAGE_ERROR:
      return {
        successMessageReducer: action.payload,
      };

    case SUCCESS_MESSAGE_WITH_TYPE_SUCCESS:
      return {
        ...state,
        successMessageAdvancedReducer: action.payload,
      };

    case SUCCESS_MESSAGE_WITH_TYPE_ERROR:
      return {
        successMessageAdvancedReducer: action.payload,
      };


    case DATA_FOR_EOPSWATCH_SUCCESS:
      return {
        ...state,
        dataforeopswatchReducer: action.payload,
      };

    case DATA_FOR_EOPSWATCH_ERROR:
      return {
        dataforeopswatchReducer: action.payload,
      };

    case EDIT_CLASS_MODEL_SUCCESS:
      return {
        ...state,
        editClassModalReducer: action.payload,
      };

    case EDIT_CLASS_MODEL_ERROR:
      return {
        error: action.payload,
      }

    case EDIT_SUB_CLASS_MODEL_SUCCESS:
      return {
        ...state,
        editSubClassModalReducer: action.payload,
      };

    case EDIT_SUB_CLASS_MODEL_ERROR:
      return {
        error: action.payload,
      }

    case EDIT_OBJECT_MODEL_SUCCESS:
      return {
        ...state,
        editObjectModalReducer: action.payload,
      };

    case EDIT_OBJECT_MODEL_ERROR:
      return {
        error: action.payload,
      }

    case EDIT_SUB_OBJECT_MODEL_SUCCESS:
      return {
        ...state,
        editSubObjectModalReducer: action.payload,
      };

    case EDIT_SUB_OBJECT_MODEL_ERROR:
      return {
        error: action.payload,
      }

    case NEW_CLASS_MODEL_SUCCESS:
      return {
        ...state,
        newClassModalReducer: action.payload,
      };

    case NEW_CLASS_MODEL_ERROR:
      return {
        error: action.payload,
      }

    case SET_DATA_FOR_SUB_OBJECT_SUCCESS:
      return {
        ...state,
        setDataForSubObjectReducer: action.payload,
      };

    case SET_DATA_FOR_SUB_OBJECT_ERROR:
      return {
        setDataForSubObjectReducer: action.payload,
      };


      case SET_DATA_FOR_SUB_OBJECT_SUCCESS:
      return {
        ...state,
        setDataForSubObjectReducer: action.payload,
      };

    case SET_DATA_FOR_SUB_OBJECT_ERROR:
      return {
        ...state,
        setDataForSubObjectReducer: action.payload,
      };


      case SELECTED_CLASS_SUCCESS:
      return {
        ...state,
        selectedClassReducer: action.payload,
        loading: false,
      };

    case SELECTED_CLASS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default classReducer;