import { urlWithQuery } from "../utils";
export const BLUEPRINT_REQUEST = "BLUEPRINT_REQUEST";
export const BLUEPRINT_FAILURE = "BLUEPRINT_FAILURE";
export const BLUEPRINT_SUCCESS = "BLUEPRINT_SUCCESS";
export const RESET_BLUEPRINTS = "RESET_BLUEPRINTS";

export const resetBlueprints = () => dispatch => dispatch({ type: RESET_BLUEPRINTS });

export const getBlueprints = (query) => dispatch => dispatch({
  types: [BLUEPRINT_REQUEST, BLUEPRINT_SUCCESS, BLUEPRINT_FAILURE],
  reqUrl: urlWithQuery("/api/blueprints", query)
});
