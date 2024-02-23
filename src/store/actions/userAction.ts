import axios from "axios";
import { GET_USERS_BY_ID_ERROR, GET_USERS_BY_ID_SUCCESS } from "../types";
import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_ERROR } from "../types";

/*
Action to get user by id
*/
export const getUserByIdAction = () => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getUsers`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_USERS_BY_ID_SUCCESS,
                payload: response?.data?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_USERS_BY_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};


/*
Action to get all users
*/
export const getAllUsersAction = () => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getAllUsers`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: response.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_ALL_USERS_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};