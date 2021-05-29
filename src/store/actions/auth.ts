import {Buffer} from "buffer";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_FAILURE = "TOKEN_FAILURE";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";

// Get Auth Token
export const authenticate = (username: string, password: string) => dispatch => {
  return dispatch({
    types: [TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE],
    reqUrl: "/api/auth",
    reqOptions: {
      headers: {
        "x-everest-basic": `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
      }
    }
  });
};

export const logout = () => dispatch => {
  return dispatch({
    type: TOKEN_FAILURE, // TOKEN_FAILURE wipes the state back to initial values, which should be the exact logic I need...
  });
};
