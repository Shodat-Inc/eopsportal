import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData:prosenseReducer,
  classReducer:classReducer,
  usersReducer:usersReducer
});