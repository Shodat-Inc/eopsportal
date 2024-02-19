import { SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS, SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR } from "../types";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authenticationToken')
}
// Store data for eopstrace
export const saveDataFlowObjectManagementAction = (data:any) => async (dispatch: any) => {
    try {
        if (data) {
            dispatch({
                type: SAVE_DATA_FLOW_OBJECT_MANAGEMENT_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: SAVE_DATA_FLOW_OBJECT_MANAGEMENT_ERROR,
                payload: data
            });
        }
    } catch (err) {
        console.log("err in data:", err)
    }
};