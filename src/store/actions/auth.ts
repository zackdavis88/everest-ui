import request from "superagent";
import {Buffer} from "buffer";

export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_FAILURE = "TOKEN_FAILURE";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Get Auth Token
export const authenticate = (username: string, password: string) => dispatch => {
  return dispatch({
    types: [TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE],
    request: request
              .get("/api/auth")
              .set("x-everest-basic", `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`)
  });
};
