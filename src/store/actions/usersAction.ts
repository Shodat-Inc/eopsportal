import { GET_SINGLE_USER_ERROR, GET_SINGLE_USER_LOADING, GET_SINGLE_USER_SUCCESS } from "../types";
import axios from "axios";
// let authenticationToken = localStorage.getItem('authenticationToken')
let authenticationToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY5Nzc0MjU0MSwiZXhwIjoxNjk4MzQ3MzQxfQ.iO0kUhr8myayJtxk_V2q61iI3DfVPBDx3HuxbChwkBM`
export const getSingleUser = (id: any) => async (dispatch: any) => {
    try {
        await axios({
            method: 'GET',
            url: `/api/getUsers`,
            headers: {
                Authorization: authenticationToken,
                "Content-Type": "application/json"
            },
            data: {
                id:id
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