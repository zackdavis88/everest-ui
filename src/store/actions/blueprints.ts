export const BLUEPRINT_REQUEST = "BLUEPRINT_REQUEST";
export const BLUEPRINT_FAILURE = "BLUEPRINT_FAILURE";
export const BLUEPRINT_SUCCESS = "BLUEPRINT_SUCCESS";
export const RESET_BLUEPRINTS = "RESET_BLUEPRINTS";

export const resetBlueprints = () => dispatch => dispatch({ type: RESET_BLUEPRINTS });
