import { LOGIN_ERROR, LOGIN_SUCCESS } from "../types";

const initialState = {
    loginData: []
};

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginData: action.payload,
            };

        case LOGIN_ERROR:
            return {
                loginData: action.payload,
            };

        default:
            return state;
    }
};

export default loginReducer;