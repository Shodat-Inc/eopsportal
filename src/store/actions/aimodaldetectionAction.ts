import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";
import { GET_CLASS_FROM_ID_ERROR, GET_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_CLASS_FROM_ID_ERROR, GET_SUB_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_OBJECT_FROM_ID_ERROR, GET_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_OBJECT_FROM_ID_ERROR, GET_SUB_OBJECT_FROM_ID_SUCCESS } from "../types";
import axios from "axios";

// storing data to transfer to modals
export const dataForModalAction = (data: any) => async (dispatch: any) => {
    try {
        if (data) {
            dispatch({
                type: DATA_FOR_MODEL_SUCCESS,
                payload: data
            });
        } else {
            dispatch({
                type: DATA_FOR_MODEL_ERROR,
                payload: "ERROR"
            });
        }
    } catch (err) {
        console.log("err in action:", err)
    }
};

// Getting Class from ID
export const getClassFromIDAction = (id: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getAssetById?id=${id}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_CLASS_FROM_ID_SUCCESS,
                payload: response?.data?.data?.rows,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_CLASS_FROM_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

// Getting SUB Class from ID
export const getSubClassFromIDAction = (classId: any, parentId: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getChildAssetById?classId=${classId}&parentId=${parentId}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_SUB_CLASS_FROM_ID_SUCCESS,
                payload: response?.data?.data?.rows,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_SUB_CLASS_FROM_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}


// Getting Object from object and class ID
export const getObjectFromIDAction = (objectID: any, classID: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getObjectById?objectId=${objectID}&classId=${classID}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_OBJECT_FROM_ID_SUCCESS,
                payload: response?.data?.data?.rows,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_OBJECT_FROM_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

// Getting SUB Object from object and class ID
export const getSubObjectFromIDAction = (objectID: any, classID: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getObjectById?objectId=${objectID}&classId=${classID}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_SUB_OBJECT_FROM_ID_SUCCESS,
                payload: response?.data?.data?.rows,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_SUB_OBJECT_FROM_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}