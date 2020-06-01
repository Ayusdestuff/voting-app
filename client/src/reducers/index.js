import { combineReducers } from "redux";
import auth from "./auth";
import polls from "./polls";

const reducers = combineReducers({
  auth,
  polls
});

export default reducers;
