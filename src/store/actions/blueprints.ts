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

export const deleteBlueprint = (id: string, confirmInput: string) => dispatch => dispatch({
  types: ["BLUEPRINT_REQUEST_NO_OP", "BLUEPRINT_SUCCESS_NO_OP", "BLUEPRINT_FAILURE_NO_OP"], // Bypassing all state processing for this action using NO_OP
  reqUrl: `/api/blueprints/${id}`,
  reqOptions: {
    method: "DELETE"
  },
  payload: {
    confirm: confirmInput
  }
});


export const createBlueprint = (name: string) => dispatch => dispatch({
  types: ["BLUEPRINT_REQUEST_NO_OP", "BLUEPRINT_SUCCESS_NO_OP", "BLUEPRINT_FAILURE_NO_OP"],
  reqUrl: "/api/blueprints",
  reqOptions: {
    method: "POST"
  },
  payload: {
    name
  }
});
