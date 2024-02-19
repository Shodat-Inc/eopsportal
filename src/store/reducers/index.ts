import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";
import assetsReducer from "./assetsReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData:prosenseReducer,
  classReducer:classReducer,
  assetsReducer:assetsReducer
});