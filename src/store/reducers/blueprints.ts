import {
  BLUEPRINT_REQUEST,
  BLUEPRINT_SUCCESS,
  BLUEPRINT_FAILURE,
  RESET_BLUEPRINTS
} from "../actions/blueprints";

const initialState = {
  isLoading: false,
  message: "",
  blueprints: null,
  error: "",
  page: 1,
  totalItems: 1,
  totalPages: 1,
  itemsPerPage: 10
};

export default function blueprintsReducer(state=initialState, action) {
  switch(action.type){
    case BLUEPRINT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case BLUEPRINT_SUCCESS:
      return {
        isLoading: false,
        message: action.response.body.message,
        blueprints: action.response.body.blueprints,
        error: "",
        page: action.response.body.page,
        totalPages: action.response.body.totalPages,
        totalItems: action.response.body.totalItems,
        itemsPerPage: action.response.body.itemsPerPage
      };
    case BLUEPRINT_FAILURE:
      return {
        isLoading: false,
        error: action.response.body.error,
        blueprints: null,
        message: "",
        page: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10
      };
    case RESET_BLUEPRINTS:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
