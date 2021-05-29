import { combineReducers } from "redux";
import auth from "./auth";
import notification from "./notification";

const combinedReducers = () => combineReducers({
  auth,
  notification
});

export default combinedReducers;
