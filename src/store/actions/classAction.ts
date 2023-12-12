import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR, TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";
import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authenticationToken')
}
/*
Function to set the selected class at Object Management Landing Page
*/
export const setSelectedClass = (selClass: any) => async (dispatch: any) => {
    try {
        if (selClass) {
            dispatch({
                type: SET_CLASS_SUCCESS,
                payload: selClass
            });
        } else {
            dispatch({
                type: SET_CLASS_ERROR,
                payload: "No Class Found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

/*
Function to toggle "Add New Object" model
*/
export const toggleAddNewObjectModel = (item: any) => async (dispatch: any) => {
    try {
        if (item === true) {
            dispatch({
                type: TOGGLE_ADD_OBJECT_MODEL_SUCCESS,
                payload: item
            });
        } else if (item === false) {
            dispatch({
                type: TOGGLE_ADD_OBJECT_MODEL_SUCCESS,
                payload: item
            });
        } else {
            dispatch({
                type: TOGGLE_ADD_OBJECT_MODEL_ERROR,
                payload: "Failed!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};


/*
Function to toggle "Add New Class Object" model
*/
export const toggleAddNewClassObjectModel = (item: any) => async (dispatch: any) => {
    try {
        if (item === true) {
            dispatch({
                type: TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS,
                payload: item
            });
        } else if (item === false) {
            dispatch({
                type: TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS,
                payload: item
            });
        } else {
            dispatch({
                type: TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR,
                payload: "Failed!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};


/*
Function to get all classes
*/
export const getSingleUser = () => async (dispatch: any) => {
    let tokenStr = access_token;
    try {
        await axios({
            method: 'GET',
            url: `/api/getAssets`,
            headers: {
                "Authorization": `Bearer ${tokenStr}`,
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                dispatch({
                    type: GET_ALL_CLASS_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: GET_ALL_CLASS_ERROR,
                    payload: error,
                });
            })
    } catch (err) {
        console.log("err in action:", err)
    }
};


/*
Function to set the class breadcrumb
*/
export const setClassBreadcrumb = (data: any) => async (dispatch: any) => {
    try {
        if (data) {
            dispatch({
                type: BREADCRUMB_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: BREADCRUMB_ERROR,
                payload: "error in setting breadcrumb"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};