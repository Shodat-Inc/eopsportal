import { SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS, SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR } from "../types";

const initialState = {
    saveDataFlowObjectManagementReducer: {}
};

const assetsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS:
            return { ...state, saveDataFlowObjectManagementReducer: action.payload };

        case SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR:
            return { error: action.payload };

        default:
            return state;
    }
};

export default assetsReducer;