import { DATA_FOR_MODEL_SUCCESS, DATA_FOR_MODEL_ERROR } from "../types";
import { GET_CLASS_FROM_ID_ERROR, GET_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_CLASS_FROM_ID_ERROR, GET_SUB_CLASS_FROM_ID_SUCCESS } from "../types";
import { GET_OBJECT_FROM_ID_ERROR, GET_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_SUB_OBJECT_FROM_ID_ERROR, GET_SUB_OBJECT_FROM_ID_SUCCESS } from "../types";
import { GET_MODEL_IMAGES_ERROR, GET_MODEL_IMAGES_SUCCESS } from "../types";
import { GET_ALL_MODEL_SUCCESS, GET_ALL_MODEL_ERROR } from "../types";
import {GET_CLASSNAME_FROM_CLASS_ID_SUCCESS, GET_CLASSNAME_FROM_CLASS_ID_ERROR} from '../types'
import {GET_OBJECT_FROM_OBJECT_ID_SUCCESS, GET_OBJECT_FROM_OBJECT_ID_ERROR} from '../types'
import {GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_SUCCESS, GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_ERROR} from '../types'
import {GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_SUCCESS, GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_ERROR} from '../types'
import axios from "axios";

// Get all Modals
export const getAllModelAction = () => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getModel`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            console.log({
                "response in getmodal": response?.data
            })
            dispatch({
                type: GET_ALL_MODEL_SUCCESS,
                payload: response?.data?.message?.data
            });
        }).catch(function (error) {
            dispatch({
                type: GET_ALL_MODEL_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

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


// Get Image URL data
export const getImageUrlDataAction = (modelID: any, type: any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getImageUrl?type=${type}&modelId=${modelID}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            dispatch({
                type: GET_MODEL_IMAGES_SUCCESS,
                payload: response?.data?.data,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_MODEL_IMAGES_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}


// Get class name from class ID
export const getClassNameFromClassID = (id: any) => async (dispatch: any) => {
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
            let className = '';
            let data = response?.data?.data?.rows;
            if (data && data.length > 0) {
                className = data[0].className
            }
            dispatch({
                type: GET_CLASSNAME_FROM_CLASS_ID_SUCCESS,
                payload: className,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_CLASSNAME_FROM_CLASS_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

// Get Sub class name from class ID
export const getSubClassNameFromClassID = (subClassId: any, parentClassID:any) => async (dispatch: any) => {
    let access_token = "" as any;
    if (typeof window !== 'undefined') {
        access_token = localStorage.getItem('authToken')
    }
    try {
        await axios({
            method: 'GET',
            url: `/api/getChildAssetById?classId=${subClassId}&parentId=${parentClassID}`,
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            let className = '';
            let data = response?.data?.data?.rows;
            if (data && data.length > 0) {
                className = data[0].className
            }
            dispatch({
                type: GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_SUCCESS,
                payload: className,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_SUB_CLASSNAME_FROM_SUB_CLASS_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

// Get OBJECT FROM OBJECT ID
export const getObjectValueFromObjectID = (objectID: any, classID:any) => async (dispatch: any) => {
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
            let data = response?.data?.data?.rows;
            let objectVal = response?.data?.data?.rows[0]?.ObjectValues[0]?.values
            dispatch({
                type: GET_OBJECT_FROM_OBJECT_ID_SUCCESS,
                payload: objectVal,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_OBJECT_FROM_OBJECT_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}

// Get SUB OBJECT FROM OBJECT ID
export const getSubObjectValueFromObjectID = (objectID: any, classID:any) => async (dispatch: any) => {
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
            let data = response?.data?.data?.rows;
            let objectVal = response?.data?.data?.rows[0]?.ObjectValues[0]?.values
            dispatch({
                type: GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_SUCCESS,
                payload: objectVal,
            });
        }).catch(function (error) {
            dispatch({
                type: GET_SUB_OBJECT_FROM_SUB_OBJECT_ID_ERROR,
                payload: error,
            });
        })
    } catch (err) {
        console.log("err in action:", err)
    }
}