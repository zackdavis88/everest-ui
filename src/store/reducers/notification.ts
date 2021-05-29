import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from "../actions/notification";

const initialState = {
  message: "",
  type: "",
  autoClose: false 
};

export default function notificationReducer(state=initialState, action) {
  const notification = action.notification || {};
  switch(action.type){
    case SHOW_NOTIFICATION:
      return {
        message: notification.message,
        type: notification.type || "info",
        autoClose: typeof notification.autoClose === "boolean" ? notification.autoClose : false
      };
    case HIDE_NOTIFICATION:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
