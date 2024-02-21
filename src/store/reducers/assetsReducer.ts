import { SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS, SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR } from "../types";
import { SET_DATA_FROM_SUCCESS, SET_DATA_FROM_ERROR } from "../types";  

const initialState = {
    saveDataFlowObjectManagementReducer: {},
    setDataFromReducer:{}
};

const assetsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS:
            return { ...state, saveDataFlowObjectManagementReducer: action.payload };

        case SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR:
            return { error: action.payload };

        case SET_DATA_FROM_SUCCESS:
            return { ...state, setDataFromReducer: action.payload };

        case SET_DATA_FROM_ERROR:
            return { error: action.payload };

        default:
            return state;
    }
};

export default assetsReducer;