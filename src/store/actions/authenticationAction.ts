import axios from "axios";
import { SAVE_USER_DATA_FIRST_STEP_SUCCESS, SAVE_USER_DATA_FIRST_STEP_ERROR } from "../types";
import { VERIFY_OTP_SUCCESS, VERIFY_OTP_ERROR } from "../types";


// SAVE DATA AT REGISTERATION (1ST STEP)
export const saveUserDataFirstStepAction = (userData: any) => async (dispatch: any) => {
    try {
        if (userData) {
            dispatch({
                type: SAVE_USER_DATA_FIRST_STEP_SUCCESS,
                payload: userData
            });
        } else {
            dispatch({
                type: SAVE_USER_DATA_FIRST_STEP_ERROR,
                payload: "No data found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

export const verifyOTPAction = (userData: any) => async (dispatch: any) => {
    try {
        if (userData) {
            dispatch({
                type: VERIFY_OTP_SUCCESS,
                payload: userData
            });
        } else {
            dispatch({
                type: VERIFY_OTP_ERROR,
                payload: "No data found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};