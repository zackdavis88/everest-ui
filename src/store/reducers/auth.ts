import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE
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
      if(typeof document === "object"){
        const expires = new Date(Date.now() + (1000 * 60 * 60 * 8)).toUTCString();
        document.cookie = `token=${action.response.headers["x-everest-token"]}; expires=${expires}; path=/`
      }
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user,
        token: action.response.headers["x-everest-token"]
      };
    case TOKEN_FAILURE:
      if(typeof document === "object")
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // expire the cookie to delete.
      return {
        ...initialState
      };
    default:
      return state;
  }
};
