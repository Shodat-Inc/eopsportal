import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { TOGGLE_ADD_CLASS_OBJECT_MODEL_ERROR, TOGGLE_ADD_CLASS_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";
import { OBJ_SELECT_DEFAULT_CLASS_ERROR, OBJ_SELECT_DEFAULT_CLASS_SUCCESS } from "../types";
import { OBJ_SELECT_DEFAULT_SUB_CLASS_ERROR, OBJ_SELECT_DEFAULT_SUB_CLASS_SUCCESS } from "../types";
import { SUCCESS_MESSAGE_ERROR, SUCCESS_MESSAGE_SUCCESS } from "../types";
import { DATA_FOR_EOPSWATCH_ERROR, DATA_FOR_EOPSWATCH_SUCCESS } from "../types";

import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authenticationToken')
}


/*
Function to set the selected class at CLASS Management Landing Page
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


/*
Function to set the selected class at OBJECT Management Landing Page
*/
export const objDefaultClassSelectorFunction = (selClass: any) => async (dispatch: any) => {
    try {
        if (selClass) {
            dispatch({
                type: OBJ_SELECT_DEFAULT_CLASS_SUCCESS,
                payload: selClass
            });
        } else {
            dispatch({
                type: OBJ_SELECT_DEFAULT_CLASS_ERROR,
                payload: "No Class Found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

/*
Function to set the selected Sub class at OBJECT Management Landing Page
*/
export const objDefaultSubClassSelectorFunction = (selClass: any) => async (dispatch: any) => {
    try {
        if (selClass) {
            dispatch({
                type: OBJ_SELECT_DEFAULT_SUB_CLASS_SUCCESS,
                payload: selClass
            });
        } else {
            dispatch({
                type: OBJ_SELECT_DEFAULT_SUB_CLASS_ERROR,
                payload: "No sub class Found!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

// Function to toggle the success message
export const successMessageAction = (action:any) => async (dispatch: any) => {
    try {
        if (action) {
            dispatch({
                type: SUCCESS_MESSAGE_SUCCESS,
                payload: action
            });
        } else {
            dispatch({
                type: SUCCESS_MESSAGE_ERROR,
                payload: action
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};


// Store data for eopswatch
export const setDataForeOpsWatchAction = (action:any) => async (dispatch: any) => {
    try {
        if (action) {
            dispatch({
                type: DATA_FOR_EOPSWATCH_SUCCESS,
                payload: action
            });
        } else {
            dispatch({
                type: DATA_FOR_EOPSWATCH_ERROR,
                payload: action
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};