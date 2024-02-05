import { GET_CLASS_API_LOADING, GET_CLASS_API_SUCCESS, GET_CLASS_API_ERROR } from "../types";
import axios from "axios";
// let access_token = "" as any;
//     if (typeof window !== 'undefined') {
//         access_token = localStorage.getItem('authToken')
//     }
    // console.log({
    //     access_token:access_token
    // })
export const getClassDataAction = () => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getAssets`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            // console.log({
            //     "HEREINACTION":response?.data?.data
            // })
            dispatch({
                type: GET_CLASS_API_SUCCESS,
                payload: response?.data?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_CLASS_API_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};