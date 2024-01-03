import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import { GET_ALL_CLASS_ERROR, GET_ALL_CLASS_SUCCESS } from "../types";
import { BREADCRUMB_SUCCESS, BREADCRUMB_ERROR } from "../types";
import { CREATE_NEW_CLASS_ERROR, CREATE_NEW_CLASS_SUCCESS } from "../types";
import { CLASS_DELETE_MODAL_TOGGLE_ERROR,  CLASS_DELETE_MODAL_TOGGLE_SUCCESS} from "../types";
import { SELECTED_CLASS_DATA_ERROR, SELECTED_CLASS_DATA_SUCCESS } from "../types";
import axios from "axios";
let access_token = "" as any;
if (typeof window !== 'undefined') {
    access_token = localStorage.getItem('authToken')
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
Function to set the selected class whole Data at Object Management 
*/
export const selectedClassDataAction = (data: any) => async (dispatch: any) => {
    try {
        if (data) {
            dispatch({
                type: SELECTED_CLASS_DATA_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: SELECTED_CLASS_DATA_ERROR,
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
Function to get all classes
*/
export const getAllClasses = () => async (dispatch: any) => {
    let tokenStr = access_token;
    try {
        await axios({
            method: 'GET',
            // url: `http://20.232.178.134:3000/api/getAssets`,
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
Function to Create New Class
*/
export const createNewClass = (data: any) => async (dispatch: any) => {
    let tokenStr = access_token;
    console.log({
        "data in createNewClass => ": data,
    })
    try {
        await axios({
            method: 'POST',
            // url: `http://20.232.178.134:3000/api/createClasses`,
            url: `/api/createClasses`,
            data: data,
            headers: {
                "Authorization": `Bearer ${tokenStr}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: CREATE_NEW_CLASS_SUCCESS,
                payload: response.data,
            });
        }).catch(function (error) {
            dispatch({
                type: CREATE_NEW_CLASS_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};


/*
Function to toggle "DELETE CLASS MODAL" model
*/
export const toogleDeleteClassModalAction = (item: any) => async (dispatch: any) => {
    try {
        if (item === true) {
            dispatch({
                type: CLASS_DELETE_MODAL_TOGGLE_SUCCESS,
                payload: item
            });
        } else if (item === false) {
            dispatch({
                type: CLASS_DELETE_MODAL_TOGGLE_SUCCESS,
                payload: item
            });
        } else {
            dispatch({
                type: CLASS_DELETE_MODAL_TOGGLE_ERROR,
                payload: "Failed!"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};