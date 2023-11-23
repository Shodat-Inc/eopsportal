import { LOGIN_ERROR, LOGIN_SUCCESS } from "../types";
import axios from "axios";

/*
Function for user signin
*/
export const userSignIn = (username: any, password:any) => async (dispatch: any) => {
    console.log({
        password: password,
        username: username
    })
    try {
        await axios({
            method: 'POST',
            url: `http://20.232.178.134:3000/api/signIn`,
            data: {
                username: username,
                password : "12345"
            },
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
        console.log("err in login action:", err)
    }
};