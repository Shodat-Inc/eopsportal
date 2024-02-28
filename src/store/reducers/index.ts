import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";
import apiReducer from "./apiReducer";
import aimodaldetectionReducer from "./aimodaldetectionReducer";
import userReducer from "./userReducer";
import authenticationReducer from "./authenticationReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData: prosenseReducer,
  classReducer: classReducer,
  apiReducer: apiReducer,
  aimodaldetectionReducer: aimodaldetectionReducer,
  userReducer: userReducer,
  authenticationReducer:authenticationReducer
});