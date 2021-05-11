import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  LOGOUT
} from "../actions/auth";

const initialState = {
  isLoading: false,
  message: null,
  token: null,
  user: null
};

export default function authReducer(state=initialState, action) {
  switch(action.type){
    case TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case TOKEN_SUCCESS:
      // localStorage.setItem("token", action.response.headers["x-everest-token"]);
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user,
        token: action.response.headers["x-everest-token"]
      };
    case TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case LOGOUT:
      // localStorage.removeItem("token");
      return {
        ...initialState,
        token: null
      };
    default:
      return state;
  }
};
