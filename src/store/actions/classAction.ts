import { CLASS_ERROR, CLASS_LOADING, CLASS_SUCCESS } from "../types";
import axios from "axios";

export const setSelectedClass = (selClass: any) => async (dispatch: any) => {
    try {
        if (selClass) {
            dispatch({
                type: CLASS_SUCCESS,
                payload: selClass
            });
        } else {
            dispatch({
                type: CLASS_ERROR,
                payload: "No Class Found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};