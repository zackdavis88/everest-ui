export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export const showNotification = (message, type="info", autoClose=false) => dispatch => {
  return dispatch({
    type: SHOW_NOTIFICATION,
    notification: {
      message,
      type,
      autoClose
    }
  });
};

export const hideNotification = () => dispatch => {
  return dispatch({
    type: HIDE_NOTIFICATION
  });
};
