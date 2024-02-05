import { GET_CLASS_API_LOADING, GET_CLASS_API_SUCCESS, GET_CLASS_API_ERROR } from "../types";

const initialState = {
    classDataReducer: [],
};

const apiReducer = (state = initialState, action: any) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default apiReducer;