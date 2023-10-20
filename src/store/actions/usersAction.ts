import { GET_SINGLE_USER_ERROR, GET_SINGLE_USER_LOADING, GET_SINGLE_USER_SUCCESS } from "../types";
import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authenticationToken')
}
console.log({
    access_token:access_token
})
export const getSingleUser = () => async (dispatch: any) => {
    let tokenStr = access_token;
    try {
        await axios({
            method: 'GET',
            url: `/api/getUsers`,
            headers: {
                "Authorization" : `Bearer ${tokenStr}`,
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_SINGLE_USER_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_SINGLE_USER_ERROR,
                    payload: error,
                });
            })
    } catch (err) {
        console.log("err in action:", err)
    }
};