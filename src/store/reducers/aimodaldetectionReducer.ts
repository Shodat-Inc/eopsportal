import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";
import { GET_CLASS_FROM_ID_ERROR, GET_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_CLASS_FROM_ID_ERROR, GET_SUB_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_OBJECT_FROM_ID_ERROR, GET_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_OBJECT_FROM_ID_ERROR, GET_SUB_OBJECT_FROM_ID_SUCCESS } from "../types";

const initialState = {
    dataForModalReducer: {},
    getClassFromIDReducer: [],
    getSubClassFromIDReducer: [],
    getObjectFromIDReducer: [],
    getSubObjectFromIDReducer: [],
};

const aimodaldetectionReducer = (state = initialState, action: any) => {
    switch (action.type) {

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

        default:
            return state;
    }
};

export default aimodaldetectionReducer;