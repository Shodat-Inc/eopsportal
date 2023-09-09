import { combineReducers } from "redux";
import sampleReducer from "./getPostReducer";
<<<<<<< HEAD

export default combineReducers({
  sampleData: sampleReducer,
=======
import prosenseReducer from "./prosenseReducer";
import classReducer from "./classReducer";

export default combineReducers({
  sampleData: sampleReducer,
  prosenseData:prosenseReducer,
  classReducer:classReducer
>>>>>>> b0579d24bbe05fbed9660d886b2fc1aeecd70b1d
});