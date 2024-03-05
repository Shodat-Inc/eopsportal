import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";
import { GET_CLASS_FROM_ID_ERROR, GET_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_CLASS_FROM_ID_ERROR, GET_SUB_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_OBJECT_FROM_ID_ERROR, GET_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_OBJECT_FROM_ID_ERROR, GET_SUB_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_MODEL_IMAGES_ERROR, GET_MODEL_IMAGES_SUCCESS } from "../types";
import { GET_ALL_MODEL_SUCCESS, GET_ALL_MODEL_ERROR } from "../types";
import { GET_CLASSNAME_FROM_CLASS_ID_SUCCESS, GET_CLASSNAME_FROM_CLASS_ID_ERROR } from '../types'
import { GET_OBJECT_FROM_OBJECT_ID_SUCCESS, GET_OBJECT_FROM_OBJECT_ID_ERROR } from '../types'
import { GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_SUCCESS, GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_ERROR } from '../types'
import { GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_SUCCESS, GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_ERROR } from '../types'
import { SAVE_RESPONSE_FROM_TEST_SUCCESS, SAVE_RESPONSE_FROM_TEST_ERROR } from '../types'

const initialState = {
    dataForModalReducer: {},
    getClassFromIDReducer: [],
    getSubClassFromIDReducer: [],
    getObjectFromIDReducer: [],
    getSubObjectFromIDReducer: [],
    getImageUrlDataReducer: [],
    getAllModelsReducer: [],
    getClassNameFromIDReducer: "",
    getSubClassNameFromIDReducer: "",
    getObjetValueFromIDReducer: "",
    getSubObjectValueFromIDReducer: "",
    saveResponseFromTestReducer:{},
};

const aimodaldetectionReducer = (state = initialState, action: any) => {
    switch (action.type) {

        // Save response from test
        case SAVE_RESPONSE_FROM_TEST_SUCCESS:
            return { ...state, saveResponseFromTestReducer: action.payload, loading: false }
        case SAVE_RESPONSE_FROM_TEST_ERROR:
            return { loading: false, error: action.payload }

        // Get Class Name from ID
        case GET_CLASSNAME_FROM_CLASS_ID_SUCCESS:
            return { ...state, getClassNameFromIDReducer: action.payload, loading: false }
        case GET_CLASSNAME_FROM_CLASS_ID_ERROR:
            return { loading: false, error: action.payload }

        // Get Sub Class name from ID
        case GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_SUCCESS:
            return { ...state, getSubClassNameFromIDReducer: action.payload, loading: false }
        case GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_ERROR:
            return { loading: false, error: action.payload }

        // Get Object Value from ID
        case GET_OBJECT_FROM_OBJECT_ID_SUCCESS:
            return { ...state, getObjetValueFromIDReducer: action.payload, loading: false }
        case GET_OBJECT_FROM_OBJECT_ID_ERROR:
            return { loading: false, error: action.payload }

        // Get sub Object Value from ID
        case GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_SUCCESS:
            return { ...state, getSubObjectValueFromIDReducer: action.payload, loading: false }
        case GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_ERROR:
            return { loading: false, error: action.payload }

        // Get All Model
        case GET_ALL_MODEL_SUCCESS:
            return { ...state, getAllModelsReducer: action.payload, loading: false }

        case GET_ALL_MODEL_ERROR:
            return { loading: false, error: action.payload }

        // Data for modal
        case DATA_FOR_MODEL_SUCCESS:
            return {
                ...state,
                dataForModalReducer: action.payload,
                loading: false,
            };

        case DATA_FOR_MODEL_ERROR:
            return {
                loading: false,
                error: action.payload,
            };

        // Get Class from ID
        case GET_CLASS_FROM_ID_SUCCESS:
            return {
                ...state,
                getClassFromIDReducer: action.payload,
                loading: false,
            };

        case GET_CLASS_FROM_ID_ERROR:
            return {
                loading: false,
                error: action.payload,
            };

        // Get SUB Class from ID
        case GET_SUB_CLASS_FROM_ID_SUCCESS:
            return {
                ...state,
                getSubClassFromIDReducer: action.payload,
                loading: false,
            };

        case GET_SUB_CLASS_FROM_ID_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Get Object from object ID & classID
        case GET_OBJECT_FROM_ID_SUCCESS:
            return {
                ...state,
                getObjectFromIDReducer: action.payload,
                loading: false,
            };

        case GET_OBJECT_FROM_ID_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Get SUB Object from object ID & classID
        case GET_SUB_OBJECT_FROM_ID_SUCCESS:
            return {
                ...state,
                getSubObjectFromIDReducer: action.payload,
                loading: false,
            };

        case GET_SUB_OBJECT_FROM_ID_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Get model images url from model ID
        case GET_MODEL_IMAGES_SUCCESS:
            return {
                ...state,
                getImageUrlDataReducer: action.payload,
                loading: false,
            };

        case GET_MODEL_IMAGES_ERROR:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default aimodaldetectionReducer;