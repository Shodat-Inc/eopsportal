import { PROSENSE_LOADING, PROSENSE_SUCCESS, PROSENSE_ERROR } from "../types";

const initialState = {
    prosenseData: [],
    loading: true,
};

const prosenseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PROSENSE_SUCCESS:
            return {
                ...state,
                prosenseData: action.payload,
                loading: false,
            };

        case PROSENSE_ERROR:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default prosenseReducer;