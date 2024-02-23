import { GET_CLASS_API_SUCCESS, GET_CLASS_API_ERROR } from "../types";
import { GET_DATA_TYPE_SUCCESS, GET_DATA_TYPE_ERROR } from "../types";
import { SELECTED_CLASS_ERROR, SELECTED_CLASS_SUCCESS } from "../types";
import { GET_SUB_CLASS_API_SUCCESS, GET_SUB_CLASS_API_ERROR } from "../types";
import { SET_SELECTED_CLASS_SUCCESS, SET_SELECTED_CLASS_ERROR } from "../types";
import { GET_OBJECTS_SUCCESS, GET_OBJECTS_ERROR } from "../types";
import axios from "axios";

// Get All Class
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

// Get all Data TYpe
export const getDataTypeAction = () => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getDataType`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_DATA_TYPE_SUCCESS,
                payload: response?.data?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_DATA_TYPE_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};


// Selected Super Class
export const selectedClassAction = (data: any) => async (dispatch: any) => {
    try {
        if (data !== "" || data !== undefined) {
            dispatch({
                type: SELECTED_CLASS_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: SELECTED_CLASS_ERROR,
                payload: "No Selected Class"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};


// Get All Sub Class Data
export const getSubClassDataAction = (id: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getChildAssets?id=${id}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_SUB_CLASS_API_SUCCESS,
                payload: response?.data?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_SUB_CLASS_API_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};

// Set Selected Class for Edit/Add classes
export const setSelectedClassAction = (classID: any) => async (dispatch: any) => {
    try {
        if (classID) {
            dispatch({
                type: SET_SELECTED_CLASS_SUCCESS,
                payload: classID
            });
        } else {
            dispatch({
                type: SET_SELECTED_CLASS_ERROR,
                payload: "No Selected Class"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

// Get Objects of a class
export const getObjectsAction = (classID:any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getObjects?id=${classID}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_OBJECTS_SUCCESS,
                payload: response?.data?.objects?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_OBJECTS_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
};