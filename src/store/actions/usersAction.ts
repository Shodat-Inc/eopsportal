import {
    GET_SINGLE_USER_ERROR,
    GET_SINGLE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS
} from "../types";
import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authToken')
}

export const getSingleUser = () => async (dispatch: any) => {
    let tokenStr = access_token;
    try {
        await axios({
            method: 'GET',
            url: `http://20.232.178.134:3000/api/getUsers`,
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
            url: `http://20.232.178.134:3000/api/updateUsers`,
            data: {
                username: `${username}`,
                firstName: `${data.firstName}`,
                lastName: `${data.lastName}`
            },
            headers: {
                "Authorization": `Bearer ${tokenStr}`,
                "Content-Type": "application/json"
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