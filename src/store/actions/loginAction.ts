import { LOGIN_ERROR, LOGIN_SUCCESS } from "../types";
import axios from "axios";

/*
Function for user signin
*/
export const userLogin = () => async (dispatch: any) => {
    try {
        await axios({
            method: 'GET',
            url: `/api/signIn`,
            headers: {                
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error,
                });
            })
    } catch (err) {
        console.log("err in action:", err)
    }
};