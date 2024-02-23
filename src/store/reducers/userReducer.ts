import { GET_USERS_BY_ID_ERROR, GET_USERS_BY_ID_SUCCESS } from "../types";
import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_ERROR } from "../types";

const initialState = {
    getUserByIdReducer: {},
    getAllUserReducer: {},
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // Get User By ID
        case GET_USERS_BY_ID_SUCCESS:
            return { ...state, getUserByIdReducer: action.payload, loading: false }
        case GET_USERS_BY_ID_ERROR:
            return { loading: false, error: action.payload }

        // Get All Users
        case GET_ALL_USERS_SUCCESS:
            return { ...state, getAllUserReducer: action.payload, loading: false }
        case GET_ALL_USERS_ERROR:
            return { loading: false, error: action.payload }

        // Default case
        default:
            return state;
    }
};

export default userReducer;