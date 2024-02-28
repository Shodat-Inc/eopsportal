import { SAVE_USER_DATA_FIRST_STEP_SUCCESS, SAVE_USER_DATA_FIRST_STEP_ERROR } from "../types";

const initialState = {
    saveUserFirstStepReducer: {}
};

const authenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {

        // SAVE USER DATA AT FIRST STEP AT REGISTERATION
        case SAVE_USER_DATA_FIRST_STEP_SUCCESS:
            return { ...state, saveUserFirstStepReducer: action.payload, loading: false }
        case SAVE_USER_DATA_FIRST_STEP_ERROR:
            return { loading: false, error: action.payload, }

        default:
            return state;
    }
};

export default authenticationReducer;