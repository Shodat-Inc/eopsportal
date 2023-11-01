import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData: prosenseReducer,
  classReducer: classReducer,
  loginReducer: loginReducer
});