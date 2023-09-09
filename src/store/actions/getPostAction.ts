import { GET_SAMPLE, SAMPLE_ERROR } from "../types";
import axios from "axios";

export const getSampleData = () => async (dispatch: any) => {
  try {
  await axios.get('https://dummyjson.com/posts')
    .then(function (response) {
      // handle success
      dispatch({
        type: GET_SAMPLE,
        payload: response.data.posts
        ,
      });
    })
    .catch(function (error) {
      // handle error
      dispatch({
        type: SAMPLE_ERROR,
        payload: error,
      });
    })
  } catch(err) {
    console.log("err in action:", err)
  }
};