import { GET_CLASS_API_SUCCESS, GET_CLASS_API_ERROR } from "../types";
import { GET_DATA_TYPE_SUCCESS, GET_DATA_TYPE_ERROR } from "../types";
import { SELECTED_CLASS_ERROR, SELECTED_CLASS_SUCCESS } from "../types";
import { GET_SUB_CLASS_API_SUCCESS, GET_SUB_CLASS_API_ERROR } from "../types";

const initialState = {
    classDataReducer: [],
    getDataTypeReducer: [],
    selectedClassReducer: 0,
    subClassDataReducer: []
};

const apiReducer = (state = initialState, action: any) => {
    switch (action.type) {

        // Get Class API
        case GET_CLASS_API_SUCCESS:
            return {
                ...state,
                classDataReducer: action.payload,
                loading: false,
            };

        case GET_CLASS_API_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Get SUB Class API
        case GET_SUB_CLASS_API_SUCCESS:
            return {
                ...state,
                subClassDataReducer: action.payload,
                loading: false,
            };

        case GET_SUB_CLASS_API_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Get Data type API
        case GET_DATA_TYPE_SUCCESS:
            return {
                ...state,
                getDataTypeReducer: action.payload,
                loading: false,
            };

        case GET_DATA_TYPE_ERROR:
            return {
                loading: false,
                error: action.payload,
            };


        // Selected Main Class 
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

export default apiReducer;