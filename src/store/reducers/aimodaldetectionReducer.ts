import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";

const initialState = {
    dataForModalReducer: {},
};

const aimodaldetectionReducer = (state = initialState, action: any) => {
    switch (action.type) {
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

        default:
            return state;
    }
};

export default aimodaldetectionReducer;