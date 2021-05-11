import { combineReducers } from "redux";
import auth from "./auth";

const combinedReducers = () => combineReducers({
  auth
});

export default combinedReducers;
