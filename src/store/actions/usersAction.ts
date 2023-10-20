import {
    GET_SINGLE_USER_ERROR,
    GET_SINGLE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "../types";
import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authenticationToken')
}

export const getSingleUser = () => async (dispatch: any) => {
    let tokenStr = access_token;
    try {
        await axios({
            method: 'GET',
            url: `/api/getUsers`,
            headers: {
                "Authorization": `Bearer ${tokenStr}`,
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

export const updateUser = (data: any, username: any) => async (dispatch: any) => {
    let tokenStr = access_token;
    console.log({
        data: data,
        username: username
    })
    try {
        await axios({
            method: 'PUT',
            url: `/api/updateUsers`,
            headers: {
                "Authorization": `Bearer ${tokenStr}`,
                "Content-Type": "application/json"
            },
            params: {
                username: username,
                firstName: data.firstName,
                lastName: data.lastName
            }
        })
            .then(function (response) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: error,
                });
            })
    } catch (err) {
        console.log("err in action:", err)
    }
};