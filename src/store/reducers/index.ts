import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";
import apiReducer from "./apiReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData: prosenseReducer,
  classReducer: classReducer,
  apiReducer: apiReducer
});