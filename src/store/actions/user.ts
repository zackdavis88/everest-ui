export const USER_REQUEST = "USER_REQUEST";
export const USER_FAILURE = "USER_FAILURE";
export const USER_SUCCESS = "USER_SUCCESS";

export const createUser = (username: string, password: string) => dispatch => {
  return dispatch({
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    reqUrl: "/api/users",
    reqOptions: {
      method: "POST"
    },
    payload: {username, password}
  });
};

export const updatePassword = (username: string, currentPassword: string, newPassword: string) => dispatch => {
  return dispatch({
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    reqUrl: `/api/users/${username}`,
    reqOptions: {
      method: "POST"
    },
    payload: {currentPassword, password: newPassword}
  });
};
