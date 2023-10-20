import { 
    GET_SINGLE_USER_ERROR, 
    GET_SINGLE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "../types";

const initialState = {
    singleUser: [],
    updateUser: []
};

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SINGLE_USER_SUCCESS:
            return {
                ...state,
                singleUser: action.payload,
            };

        case GET_SINGLE_USER_ERROR:
            return {
                error: action.payload,
            };


        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUser: action.payload,
            };

        case UPDATE_USER_ERROR:
            return {
                error: action.payload,
            };



        default:
            return state;
    }
};

export default usersReducer;