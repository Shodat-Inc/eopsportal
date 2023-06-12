import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";

export default combineReducers({
  sampleData: sampleReducer,
});