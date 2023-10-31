import { SET_CLASS_ERROR, SET_CLASS_SUCCESS } from "../types";
import { TOGGLE_ADD_OBJECT_MODEL_ERROR, TOGGLE_ADD_OBJECT_MODEL_SUCCESS } from "../types";
import axios from "axios";

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
export const toggleAddNewObjectModel = (item:any) => async (dispatch: any) => {
    try {
        if (item===true) {
            dispatch({
                type: TOGGLE_ADD_OBJECT_MODEL_SUCCESS,
                payload: item
            });
        } else if (item===false) {
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