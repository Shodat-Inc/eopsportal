import { PROSENSE_LOADING, PROSENSE_SUCCESS, PROSENSE_ERROR } from "../types";
import axios from "axios";

export const getProsenseData = () => async (dispatch: any) => {
    try {
        await axios.get('/api/getProsense')
            .then(function (response) {
                dispatch({
                    type: PROSENSE_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(function (error) {
                dispatch({
                    type: PROSENSE_ERROR,
                    payload: error,
                });
            })
    } catch (err) {
        console.log("err in action:", err)
    }
};