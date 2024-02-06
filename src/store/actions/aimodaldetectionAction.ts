import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";
import axios from "axios";
export const dataForModalAction = (data: any) => async (dispatch: any) => {
    try {
        if (data) {
            dispatch({
                type: DATA_FOR_MODEL_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: DATA_FOR_MODEL_ERROR,
                payload: "ERROR"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};