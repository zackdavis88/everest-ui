import { combineReducers } from "redux";
import auth from "./auth";
import notification from "./notification";
import blueprints from "./blueprints";

const combinedReducers = () => combineReducers({
  auth,
  notification,
  blueprints
});

export default combinedReducers;
